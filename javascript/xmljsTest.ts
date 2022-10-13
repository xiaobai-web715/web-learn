const xml2js = require('xml2js')

const obj = {
    general: [
      {
        timeZone: [
          {
            // _代表innerText $代表标签属性
            _: "Asia/Shanghai GMT+8 offset 28800",
            $: {
              support: "1",
            },
          },
        ],
        deviceId: [
          {
            $: {
              support: "1",
            },
          },
        ],
        antiFlicker: [
          {
            _: "50",
            $: {
              support: "1",
            },
          },
        ],
      }
    ],
    alerts: [
      {
        sendAlerts: [
          {
            _: "On",
            $: {
              support: "1",
            },
          },
        ],
        scheduleNotSendAlerts: [
          {
            $: {
              support: "1",
            },
            status: [
              "On",
            ],
            schedules: [
              "",
            ],
          },
        ],
      },
    ],
  }
//对象转xml
let builder = new xml2js.Builder();
let xml = builder.buildObject(obj)
console.info('xml', xml)

//xml转对象
let parseString = xml2js.parseString;
let target = parseString(xml, (err, result) => {
    console.info(result)
})