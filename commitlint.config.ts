import { RuleConfigSeverity, type UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-atom',
  formatter: '@commitlint/format',
  rules: {
    'header-case': [RuleConfigSeverity.Error, 'always', 'sentence-case'],
    'header-min-length': [RuleConfigSeverity.Error, 'always', 5],
    'header-trim': [RuleConfigSeverity.Error, 'always'],
    'scope-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
    'scope-max-length': [RuleConfigSeverity.Error, 'always', 72],
    'type-max-length': [RuleConfigSeverity.Error, 'always', 10],
    'type-min-length': [RuleConfigSeverity.Error, 'always', 3],
  },
}

// biome-ignore lint/style/noDefaultExport: <for config>
export default Configuration
