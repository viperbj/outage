// ======= Templates =======
const OUTAGE_TEMPLATES = {
      "Fiber breakage": {
        np_with: "{{LOCATION}} najik fiber kaatiyeko hunale hamro sewa abharudha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik fiber kaatiyeko hunale hamro sewa abharudha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area due to Fiber breakage near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Electric Short Circuit": {
        np_with: "{{LOCATION}} najik bijuli short circuit huda hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik bijuli short circuit huda hamro sewa abharuddha vayeko cha. NEA ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to an Electric short circuit near {{LOCATION}}. We will act for recovery only after NEA complete their work. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Pole breakage": {
        np_with: "{{LOCATION}} najik NEA ko pole dhaleko huda hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik NEA ko pole dhaleko huda hamro sewa abharuddha vayeko cha. NEA ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to Pole breakage near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Pole shifting by NEA": {
        np_with: "{{LOCATION}} najik NEA le pole sareko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik NEA le pole sareko hunale hamro sewa abharuddha vayeko cha. NEA ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to Pole shifting by NEA near {{LOCATION}}. We will act for recovery only after NEA complete their work. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Fiber Cut by NEA": {
        np_with: "{{LOCATION}} najik NEA le fiber kateko hunale hamro sewa abharudha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik NEA le fiber kateko hunale hamro sewa abharudha vayeko cha. NEA ko Kaam paschaat hamro kaam suru hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fiber cut by NEA near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Pole shifting by NTC": {
        np_with: "{{LOCATION}} najik NTC le pole sareko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik NTC le pole sareko hunale hamro sewa abharuddha vayeko cha. NTC ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to Pole shifting by NTC near {{LOCATION}}. We will act for recovery only after NTC complete their work. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      
      "Fallen Tree": {
        np_with: "{{LOCATION}} najik rukh dhaleko karan fiber katiyeko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik rukh dhalera fiber katiyeko hunale hamro sewa abharuddha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area due to Fallen Tree near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Fiber Burn": {
        np_with: "{{LOCATION}} najik fiber jaleko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik fiber jaleko hunale hamro sewa abharuddha vayeko cha. NEA ko Kaam paschaat hamro kaam suru hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fiber burn near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Fiber pulled by Vehicle": {
        np_with: "{{LOCATION}} najik gadi le fiber cable chudaaleko huda hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik gadi le fiber cable chudaaleko huda hamro sewa abharuddha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area due to Fiber pulled by Vehicle near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Fire on Pole": {
        np_with: "{{LOCATION}} najik pole aaglagi huda hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik pole aaglagi huda hamro sewa abharuddha vayeko cha. NEA ko Kaam paschaat hamro kaam suru hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fire on a pole near {{LOCATION}}. We will act for recovery only after NEA complete their work. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Road expansion": {
        np_with: "{{LOCATION}} najik baato badhaune kaam vayiraheko hunale hamro sewa abharuddha vayeko cha. Sewa sucharu huna aanumanit [ETR] lagne jankari gardachau.",
        np_without: "{{LOCATION}} najik baato badhaune kaam vayiraheko huda sewa abharuddha vayeko cha. Pole jadan ko kaam paschat kaam suru hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Road expansion near {{LOCATION}}. We will act for recovery once the road expansion work has been completed. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Pole removed by NEA": {
        np_with: "{{LOCATION}} najik NEA le pole hatayeko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari gardachau.",
        np_without: "{{LOCATION}} najik NEA le pole hatayeko hunale hamro sewa abharuddha vayeko cha. NEA ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to Pole removal near {{LOCATION}}. We will act for recovery only after NEA complete their work. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Pole removed by NTC": {
        np_with: "{{LOCATION}} najik NTC le pole hatayeko hunale hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari gardachau.",
        np_without: "{{LOCATION}} najik NTC le pole hatayeko hunale hamro sewa abharuddha vayeko cha. NTC ko kaam paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service at your area due to Pole removal near {{LOCATION}}. We will act for recovery only after NTC complete their work. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Fiber Cut by Municipality": {
        np_with: "{{LOCATION}} najik Nagarpalika le fiber kateko hunale hamro sewa abharudha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik Nagarpalika le fiber kateko hunale hamro sewa abharudha vayeko cha. Nagarpalika ko kaam paschaat hamro kaam hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fiber cut by Municipality near {{LOCATION}}. We will act for recovery only after the Municipality completes its task. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Landslide": {
        np_with: "{{LOCATION}} najik pahiro gayeko hunale hamro sewa abharuddha vairaheko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik pahiro gayeko hunale hamro sewa abharudha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area due to landslide near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Flood": {
        np_with: "{{LOCATION}} najik badi le garda hamro sewa abharuddha vairaheko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik badi le garda hamro sewa abharudha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area due to flood near {{LOCATION}}. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience."
      },
      "Fiber Management by ward": {
        np_without: "{{LOCATION}} najik Ward dwara fiber kaatiyeko huda sewa abharudha vayeko cha. Ward ko kaam paschaat hamro kaam hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fiber management being performed by Ward near {{LOCATION}}. We will act for recovery only after the Municipality completes its task. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Fiber Management by Municipality": {
        np_without: "{{LOCATION}} najik Nagarpalika dwara fiber kaatiyeko huda sewa abharudha vayeko cha. Nagarpalika ko kaam paschaat hamro kaam hune jankari garaudachau.",
        en_without: "We are out of service at your area due to Fiber management being performed by Municipality near {{LOCATION}}. We will act for recovery only after the Municipality completes its task. We will keep you updated on the progress of maintenance. Thank you for your patience."
      },
      "Others": {
        np_with: "{{LOCATION}} najik samasya ko karan le hamro sewa abharuddha vayeko cha ra sewa sucharu huna aanumanit [ETR] lagne jankari garaudachau.",
        np_without: "{{LOCATION}} najik samasya ko karan le hamro sewa abharuddha vayeko cha. Kaam thalani aghi hajur lai purna jankari garaunechau.",
        en_without: "We are out of service at your area near {{LOCATION}} due to technical issues. We are planning to take action for the resolution as soon as possible. We will update you again soon on the service status and estimated recovery time. W\ne apologize for the inconvenience."
      },
      // Special Cases
      "Rato Machhindranath": {
        tag: "ETR: Unknown (After Jatra completion)",
        np_without: "Rato Machindranath Jatra ko karanle tapai ko chhetramaa hamro sewa abharuddha vayeko cha. Jatra sake paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service in your area due to Rato Machindranath Jatra. We will act for recovery only after the Jatra. We will update you again on the maintenance progress. \nWe apologize for the inconvenience."
      },
      "Seto Machhindranath": {
        tag: "ETR: Unknown (After Jatra completion)",
        np_without: "Seto Machindranath Jatra ko karanle tapai ko chhetramaa hamro sewa abharuddha vayeko cha. Jatra sake paschaat hamro kaam suru hune jaankari garaudachau.",
        en_without: "We are out of service in your area due to Seto Machindranath Jatra. We will act for recovery only after the Jatra. We will update you again on the maintenance progress. \nWe apologize for the inconvenience."
      },
      "Technical Issue": {
        tag: "ETR: Unknown ()",
        np_without: "Prabidhik samasya ko karan le hamro sewa ko gunastar ma kami aayako ra sudar ko lagi kaam bhairaheko jankari garaudachau.",
        en_without: "Due to technical issues, there has been a decrease in the quality of our service in your area. We are actively working on resolving the issue and improving the service quality. We will keep you updated on the progress and provide an estimated recovery time soon. \nWe apologize for any inconvenience caused."
      },
      
      // ACK2 template
      "ACK2": {
        header: "Fiber Breakage ETR: Tomorrow",
        np: "Tapaiko chhetrama hamro sewa sampanna garna nasakeykole chyama prarthi chau. Sewa sucharu garne kaam bholi bihana matra hune jaankari garaudachau.",
        en: "Dear Valued Customer,\n\nWe are still out of service in your area.\nWe will only act for recovery by Tomorrow morning.\nWe will update you again soon on the service status and estimated recovery time. \nWe apologize for the inconvenience.\n\nSincerely,\nCustomer Service Department\nContact no: 9801523051\nWorldLink"
      }
    };

const RAIN_TEMPLATE = {
  tag: "ETR: Unknown (Due to continuous rainfall in area)",
  np: "Aadarniya Graahak,\nLagatar Pani pari raheko karanle sewa sucharu garna nasakeko ra mausam anukul vayepaxi matrai kaam hune jankari garaudachhau.",
  en: `Dear Valued Customer,\n\nWe are still out of service in your area. We are unable to restore our service due to continuous rainfall. We will act for recovery only after rainfall stops. We will update you again.\nWe apologize for the inconvenience.\n\nSincerely,\nCustomer Service Department\nContact no: ${CONTACT}\n${COMPANY}`
};

const RAIN_MID_TEMPLATE = {
  tag: "ETR: Unknown (Due to light rainfall)",
  np: "{location} najik {rfo_np} huda hamro sewa abharuddha vayeko cha. Pani parekole sewa sucharu garna nasakeko jankari garaunechau.",
  en: `Dear Valued Customer,\n\nWe are still out of service in your area due to {rfo_en} near {location}. We are unable to restore our service due to continuous rainfall. We will act for recovery only after rainfall stops. We will update you again.\nWe apologize for the inconvenience.\n\nSincerely,\nCustomer Service Department\nContact no: ${CONTACT}\n${COMPANY}`
};

const MAINT_TEMPLATE = {
  // np: `Hami bholi [nepali_date] bihana [start_time] dekhi [end_time] samma marmat karya garna lageko huda ukta samayama sewa abharuddha huna sakne agrim suchit gardachau.`,
  np: `हामी भोलि [nepali_date] गते बिहान [start_time] बजेदेखि [end_time] बजेसम्म मर्मत कार्य गर्न लागेको हुँदा उक्त समयमा सेवा अवरुद्ध हुन सक्ने अग्रिम जानकारी गराउँदछौँ।`,
  en: `Dear Valued Customer,\n\nWe are going to have maintenance work tomorrow morning [english_date] from [start_time] to [end_time]. Our service might get interrupted during the maintenance period. We will keep you updated on the service status and estimated recovery time. \nWe apologize for the inconvenience.\n\nSincerely,\nCustomer Service Department\nContact no: ${CONTACT}\n${COMPANY}`
};