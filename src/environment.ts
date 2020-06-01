import 'dotenv/config';

const defaultPort = 4000;

interface IEnvironment {
  apollo: {
    playground: boolean;
  };
  port: number | string;
}

const environment: IEnvironment = {
  apollo: {
    playground: process.env.APOLLO_PLAYGROUND === 'true',
  },
  port: process.env.PORT || defaultPort,
};

export default environment;
