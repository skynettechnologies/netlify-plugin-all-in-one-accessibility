const { env } = require("process");
const fetch = require("node-fetch");

module.exports = {
  onBuild : async ({ constants, utils }) => {
    const siteId = process.env.SITE_ID;
    const apiKey = process.env.ACCESS_API_KEY ?? 'MDEtNjQxYjA1NTUtOGIzZC0zMjRkLTUzMTItOTg0ZjRhYjNjODI0';

    var formdata = new FormData();
    formdata.append('website_url', window.location.hostname);

    var requestOptions = {
        method: 'POST',
        body: formdata,
      };

      fetch('https://ada.skynettechnologies.us/api/widget-settings', requestOptions)
          .then((response) => response.json())
          .then((response) => {
            if (Object.keys(response['Data']).length !== 0) {
              setIsValid(true);
              console.log('setIsValid', isValid);
              if (Object.keys(settingList).length !== 0) {
                console.log('response Get Data', response['Data']['widget_color_code']);
                console.log('response Get Data', response['Data']['widget_position']);
                console.log('response Get Data', response['Data']['widget_icon_type']);
                console.log('response Get Data', response['Data']['widget_icon_size']);

                // console.log('License Key', settingList['License_Key']);
                console.log('Color Code', settingList['Color_Code']);
                console.log('Icon Position', settingList['Icon_Position']);
                console.log('Icon Type', settingList['Icon_Type']);
                console.log('Icon Size', settingList['Icon_Size']);

                if (response['Data']['widget_position'] !== settingList['Icon_Position']) {
                  setIsChanged(true);
                }
                if (response['Data']['widget_color_code'] !== settingList['Color_Code']) {
                  setIsChanged(true);
                }
                if (response['Data']['widget_icon_type'] !== settingList['Icon_Type']) {
                  setIsChanged(true);
                }
                if (response['Data']['widget_icon_size'] !== settingList['Icon_Size']) {
                  setIsChanged(true);
                }

                if (isChanged == true) {
                  setParameters({
                    // licenseKey: "settingList['License_Key']",
                    licenseKey: "",
                    hexaColor: response['Data']['widget_color_code'],
                    position: response['Data']['widget_position'],
                    icontype: response['Data']['widget_icon_type'],
                    iconsize: response['Data']['widget_icon_size'],
                  });

                  SettingsApiHandler.editSettings(settingList.id, {
                    // License_Key: settingList['License_Key'],
                    License_Key: "",
                    Color_Code: response['Data']['widget_color_code'],
                    Icon_Position: response['Data']['widget_position'],
                    Icon_Type: response['Data']['widget_icon_type'],
                    Icon_Size: response['Data']['widget_icon_size'],
                  });

                  // setParameters({ licenseKey: settingList["License Key"], hexaColor: settingList["Color Code"], position: settingList["Icon Position"], icontype: settingList["Icon Type"], iconsize: settingList["Icon Size"] })
                }
              } else {
                console.log('response Get Data', response['Data']['widget_color_code']);
                console.log('response Get Data', response['Data']['widget_position']);
                console.log('response Get Data', response['Data']['widget_icon_type']);
                console.log('response Get Data', response['Data']['widget_icon_size']);
              }
            } else {
              setIsValid(false);
            }
          })
          .catch((error) => console.log('error', error));

  },
  onSuccess: async ({ utils }) => {
    // Only run this in PR deploys
    if (process.env.CONTEXT !== "deploy-preview") {
      console.log(`Not in deploy-preview. Skipping Ghost Inspector tests.`)
      return
    }


    try {
      setTimeout(() => { let aioa_script_tag = document.createElement("script"); aioa_script_tag.src = "https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=#ffcf01&token=ADAAIOA-BEC0DB5D376942415021C02D9339AE23&position=bottom_left";  aioa_script_tag.id = "aioa-adawidget";aioa_script_tag.defer="true"; document.getElementsByTagName("body")[0].appendChild(aioa_script_tag); }, 3000);

    } catch (error) {
      return utils.build.failPlugin('Failed to execute Ghost Inspector suite.', { error })
    }


  },
};
