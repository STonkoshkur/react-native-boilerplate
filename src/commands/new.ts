module.exports = {
  name: 'new',
  alias: 'n',
  run: async function(toolbox) {
    const { filesystem, print, meta, prompt, system, parameters } = toolbox

    if (!parameters.first) {
      print.error('Name of project is required')
      process.exit(1)
    }
    const projectName = (parameters.first || "").toString()
    const ignitePath = filesystem.path(`${meta.src}`, "..")

    const initSpinner = print.spin('Starting init');
    const a = await system.run(`npx react-native init ${projectName} --template file://${ignitePath}`)
    console.log(a, 'com.company.rnboilerplate =====')
    initSpinner.succeed('App has been created')

    process.chdir(projectName)

    const packageSpinner = print.spin('Changing package.json');
    let packageJsonRaw = filesystem.read('package.json')
    packageJsonRaw = packageJsonRaw
      .replace(/ReactNativeBoilerplate/g, projectName)
    let packageJson = JSON.parse(packageJsonRaw)
    filesystem.write('package.json', packageJson)
    packageSpinner.succeed('package.json has been changed')

    const detoxSpinner = print.spin('Changing detox.config')
    let detoxConfigRaw = filesystem.read('detox.config.js')
    detoxConfigRaw = detoxConfigRaw
      .replace(/ReactNativeBoilerplate/g, projectName)
    filesystem.write('detox.config.js', detoxConfigRaw)
    detoxSpinner.succeed('detox.config has been changed')

    const askDependencies = {
      type: 'multiselect',
      name: 'dependencies',
      message: 'What dependencies are you want?',
      choices: ['husky', 'react-native-vector-icons'],
    }

    const { dependencies } = await prompt.ask(askDependencies)
    if (dependencies.includes('husky')) {
      const spinner = print.spin('Installing husky')
      await system.run('git init')
      await system.run('npx husky-init && yarn')
      await system.run('npx husky set .husky/pre-commit "yarn run ts-compile-check && yarn lint-staged"')
      spinner.succeed('Husky has been installed')
    }
    if (dependencies.includes('react-native-vector-icons')) {
      const spinner = print.spin('react-native-vector-icons')
      await system.run('yarn add react-native-vector-icons')
      spinner.succeed('react-native-vector-icons has been installed')
    }

    const podsSpinner = print.spin('Starting pods install');
    await system.run('npx pod-install')
    podsSpinner.succeed('Pods has been installed')
  }
}
