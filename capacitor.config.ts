import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.frc5431',
  appName: 'Crescendo Cycle Time',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
