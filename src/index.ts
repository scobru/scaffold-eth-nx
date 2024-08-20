export { default as scaffoldEth } from './generators/scaffold-eth/generator';
import { ExecutorContext } from '@nrwl/devkit';
import { execSync } from 'child_process';

export interface ScaffoldEthExecutorOptions {
  command: string;
}
export default async function runExecutor(
  options: ScaffoldEthExecutorOptions,
  context: ExecutorContext
) {
  try {
    execSync(`yarn ${options.command}`, {
      stdio: 'inherit',
      cwd: context.root,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to run command:', error);
    return { success: false };
  }
}