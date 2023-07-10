const puppeteer = require('puppeteer');
const Xvfb = require('xvfb');
const child_process = require('child_process');
const bbb = require('bigbluebutton-js');
var kill = require('tree-kill');
const dotenv = require("dotenv");
const Docker = require('dockerode')


dotenv.config();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });


// variables
var BBB_URL = process.env.BBB_URL;
var BBB_SECRET = process.env.BBB_SECRET;
var MEETING_ID = process.env.MEETING_ID;
var ATTENDIEE_PW = process.env.ATTENDIEE_PW;
var SHOW_PRESENTATION = process.env.SHOW_PRESENTATION
var HIDE_USER_LIST_AND_CHAT = process.env.HIDE_USER_LIST_AND_CHAT;
var RTMP_URL = process.env.RTMP_URL;
let api = bbb.api(BBB_URL, BBB_SECRET)
let http = bbb.http
var disp_num = Math.floor(Math.random() * (200 - 99) + 99);
var xvfb = new Xvfb({
    displayNum: disp_num,
    silent: true,
    xvfb_args: ["-screen", "0", "1920x1080x24", "-ac", "-nolisten", "tcp", "-dpi", "96", "+extension", "RANDR"]
});
var width = 1920;
var height = 1080;
var options = {
    headless: false,
    args: [
        '--disable-infobars',
        '--no-sandbox',
        '--shm-size=2gb',
        '--disable-dev-shm-usage',
        `--window-size=${width},${height}`,
        '--app=https://www.google.com/',
        '--start-fullscreen',

    ],
}

options.executablePath = "/usr/bin/google-chrome"

async function main() {
    try {

        let browser, page;

        try {
            xvfb.startSync()
            var JOIN_PARAM = {
                'userdata-bbb_force_listen_only': 'true',
                'userdata-bbb_listen_only_mode': 'true',
                'userdata-bbb_skip_check_audio': 'true',
                'userdata-bbb_show_public_chat_on_login': 'true',
                'userdata-bbb_hide_actions_bar': 'true',
                'role': 'VIEWER'
            };

            // Hides presentation if SHOW_PRESENTATION is true
            if (SHOW_PRESENTATION === 'false') {
                JOIN_PARAM['userdata-bbb_auto_swap_layout'] = 'true';
            }

            if (HIDE_USER_LIST_AND_CHAT === 'true') {
                JOIN_PARAM['userdata-bbb_show_participants_on_login'] = 'false';
                JOIN_PARAM['userdata-bbb_show_public_chat_on_login'] = 'false';
            }

            // Create Join URL
            let url = api.administration.join('Live Stream', MEETING_ID, ATTENDIEE_PW, JOIN_PARAM);


            browser = await puppeteer.launch(options)
            const pages = await browser.pages()
            page = pages[0]

            await page._client.send('Emulation.clearDeviceMetricsOverride')
            await page.goto(url, { waitUntil: 'networkidle2' })
            await page.setBypassCSP(true)


            // Hide mouse
            await page.mouse.move(0, 700);
            await page.addStyleTag({ content: '@keyframes refresh {0%{ opacity: 1 } 100% { opacity: 0.99 }} body { animation: refresh .01s infinite }' });

            console.log("meeting started")

            function removeContainer() {
                const container = docker.getContainer(process.env.IMAGE_NAME);

                container.remove({ force: true }, function (err) {
                    if (err) {
                        console.log('Error removing container:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    console.log('Container removed successfully');
                    return res.status(200).json({ message: 'Container removed successfully' });
                });
            }

            //  ffmpeg screen record start
            const ls = child_process.spawn('sh ',
                ['/usr/src/app/start-streaming.sh', ' ', `${RTMP_URL}`, ' ', `${disp_num}`],
                { shell: true });

            ls.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ls.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            ls.on('close', (code) => {
                console.log("calling remove container")
                removeContainer();
                console.log(`child process exited with code ${code}`);

            });




            process.once("SIGINT", function (code) {
                kill(ls.pid)
                page.close
                browser.close
                xvfb.stopSync()
                console.log("SIGINT received...");
                removeContainer();
            });



            await page.waitForSelector('[data-test="meetingEndedModalTitle"]', { timeout: 0 });
            console.log("meeting ended")
            removeContainer();
            kill(ls.pid)

        } catch (err) {
            console.log("Error:", err)
            removeContainer();
        } finally {
            page.close && await page.close()
            browser.close && await browser.close()
            xvfb.stopSync()
            removeContainer();

        }
    } catch (error) {
        console.error(error)
        removeContainer();
    }

}

main()
