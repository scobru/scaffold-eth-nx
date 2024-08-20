import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { scaffoldEthGenerator } from './generator';
import { ScaffoldEthGeneratorSchema } from './schema';

describe('scaffold-eth generator', () => {
  let tree: Tree;
  const options: ScaffoldEthGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await scaffoldEthGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  }, 100000);
});
