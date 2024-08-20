import {
  Tree,
  formatFiles,
  installPackagesTask,
  addProjectConfiguration,
  logger,
} from '@nrwl/devkit';
import { ScaffoldEthGeneratorSchema } from './schema';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

function runCommand(command: string, options?: any) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    logger.error(`Failed to execute command: ${command}`);
    throw new Error(error);
  }
}

function removeGitDirectory(filePath: string) {
  const gitPath = join(filePath, '.git');
  if (existsSync(gitPath)) {
    runCommand(`rd /s /q ${gitPath}`);
  } else {
    logger.warn(`Path not found: ${gitPath}`);
  }
}

function validateSchema(schema: ScaffoldEthGeneratorSchema) {
  if (!schema.name) {
    throw new Error('The "name" field is required in the schema.');
  }
  // Add more validations as needed
}

export async function scaffoldEthGenerator(
  tree: Tree,
  schema: ScaffoldEthGeneratorSchema
) {
  const projectRoot = `packages/${schema.name}`;

  // Clone the scaffold-eth-2 repository into the specified project root
  logger.info(`Cloning scaffold-eth-2 repository into ${projectRoot}`);
  runCommand(
    `git clone https://github.com/scaffold-eth/scaffold-eth-2.git ${projectRoot}`,
    { cwd: process.cwd() }
  );

  // Remove the .git directory to avoid any issues with version control
  logger.info(`Removing .git directory from ${projectRoot}`);
  removeGitDirectory(projectRoot);

  // Add project configuration with all targets
  addProjectConfiguration(tree, schema.name, {
    root: projectRoot,
    projectType: 'application',
    targets: {
      account: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat account`,
          cwd: projectRoot,
        },
      },
      chain: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat chain`,
          cwd: projectRoot,
        },
      },
      fork: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat fork`,
          cwd: projectRoot,
        },
      },
      deploy: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat deploy`,
          cwd: projectRoot,
        },
      },
      verify: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat verify`,
          cwd: projectRoot,
        },
      },
      hardhatVerify: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat hardhat-verify`,
          cwd: projectRoot,
        },
      },
      compile: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat compile`,
          cwd: projectRoot,
        },
      },
      generate: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat generate`,
          cwd: projectRoot,
        },
      },
      flatten: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat flatten`,
          cwd: projectRoot,
        },
      },
      hardhatLint: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat lint`,
          cwd: projectRoot,
        },
      },
      hardhatLintStaged: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat lint-staged`,
          cwd: projectRoot,
        },
      },
      hardhatFormat: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat format`,
          cwd: projectRoot,
        },
      },
      hardhatTest: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/hardhat test`,
          cwd: projectRoot,
        },
      },
      test: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn hardhat:test`,
          cwd: projectRoot,
        },
      },
      format: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn next:format && yarn hardhat:format`,
          cwd: projectRoot,
        },
      },
      start: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs dev`,
          cwd: projectRoot,
        },
      },
      nextLint: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs lint`,
          cwd: projectRoot,
        },
      },
      nextFormat: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs format`,
          cwd: projectRoot,
        },
      },
      nextCheckTypes: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs check-types`,
          cwd: projectRoot,
        },
      },
      nextBuild: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs build`,
          cwd: projectRoot,
        },
      },
      nextServe: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs serve`,
          cwd: projectRoot,
        },
      },
      vercel: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs vercel`,
          cwd: projectRoot,
        },
      },
      vercelYolo: {
        executor: '@nrwl/workspace:run-commands',
        options: {
          command: `yarn workspace @${schema.name}/nextjs vercel:yolo`,
          cwd: projectRoot,
        },
      },
    },
    tags: [],
  });

  // Update the root package.json to add an installation script for the new project
  const packageJsonPath = 'package.json';
  if (tree.exists(packageJsonPath)) {
    const packageJson = JSON.parse(tree.read(packageJsonPath).toString());

    packageJson.scripts = packageJson.scripts || {};

    // Add a new script to install the dependencies for the cloned project
    packageJson.scripts[
      `install-${schema.name}`
    ] = `cd ./${projectRoot} && yarn`;

    // Write the updated package.json back to disk
    tree.write(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  // Format all modified files
  await formatFiles(tree);

  // Install any dependencies that were added
  return () => {
    installPackagesTask(tree);
  };
}

export default scaffoldEthGenerator;
