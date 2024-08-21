/**
 * This script starts a local registry for e2e testing purposes.
 * It is meant to be called in jest's globalSetup.
 */
import { startLocalRegistry } from '@nx/js/plugins/jest/local-registry';
import { releasePublish, releaseVersion } from 'nx/release';

export default async () => {
  const localRegistryTarget = 'scaffold-eth-nx:local-registry';
  const storage = './tmp/local-registry/storage';

  global.stopLocalRegistry = await startLocalRegistry({
    localRegistryTarget,
    storage,
    verbose: true, // Enable verbose to get more details
  });

  try {
    await releaseVersion({
      specifier: '1.1.12-e2e',
      stageChanges: true,
      gitCommit: true,
      gitTag: true,
      firstRelease: false,
      generatorOptionsOverrides: {
        skipLockFileUpdate: true,
      },
    });
  } catch (error) {
    console.error('Error during versioning:', error);
  }

  try {
    const result = await releasePublish({
      tag: 'e2e',
      firstRelease: false,
    });
    console.log('Publish result:', result);
  } catch (error) {
    console.error('Error during publish:', error);
    console.error('Publish output:', error.output); // Add this line to see the raw output
  }
};
