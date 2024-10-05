/**
 * env.js
 * - implement function that parses environment variables
 * with prefix RSS_ and prints them to the console
 * in the format RSS_name1=value1; RSS_name2=value2
 */
const parseEnv = () => {
  const envs = Object.keys(process.env).filter((e) => e.startsWith("RSS_"));
  const output = envs
    .reduce((output, env) => {
      return output + `${env}=${process.env[env]}; `;
    }, "")
    .trim();
  console.log(output);
};

parseEnv();
