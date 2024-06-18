export const Url = () => {
  let application = "ga";
  let baseAPI, baseWEB1, baseWEB2;
  switch (application) {
    case "ga":
      // baseAPI = 'https://bogaproject.com/agent';
      baseAPI = "https://wmapis-staging.iegaming.io";
      // baseAPI='https://api.bowmproject.com'
      // baseAPI='https://api.bestway9.ph'
      baseWEB1 = "https://09092002.com/register?ag_id=";
      baseWEB2 = "https://08042002.com/register?ag_id=";
      break;
    case "sv":
      baseAPI = "https://bo.svw38.com/agent";
      baseWEB1 = "https://svw38.com/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    case "tg":
      baseAPI = "https://bo.tggenting.com/agent";
      baseWEB1 = "https://tggenting.com/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    case "gawin":
      baseAPI = "https://bo.ga6789.info/agent";
      baseWEB1 = "https://ga6789.info/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    case "sv368":
      baseAPI = "https://bo.sv368ga.com/agent";
      baseWEB1 = "https://sv368ga.com/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    case "master":
      baseAPI = "https://master.gasv388.net/agent";
      // baseAPI = 'https://master.ga6789.net/agent';
      baseWEB1 = "https://sv368ga.com/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    case "staging":
      baseAPI = "https://staging.gasv388.net/agent";
      baseWEB1 = "https://sv368ga.com/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
    default:
      baseAPI = "http://127.0.0.1:8000/agent";
      baseWEB1 = "http://127.0.0.1:8000/register?ag_id=";
      baseWEB2 = baseWEB1;
      break;
  }
  return { baseAPI: baseAPI, baseWEB1: baseWEB1, baseWEB2: baseWEB2 };
};
