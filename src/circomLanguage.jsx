// src/circomLanguage.js
import * as monaco from 'monaco-editor';

export function setupCircom() {
  monaco.languages.register({ id: 'circom' });

  monaco.languages.setMonarchTokensProvider('circom', {
    tokenizer: {
      root: [
        [/[a-z_$][\w$]*/, 'identifier'],
        [/\b\d+\b/, 'number'],
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment']
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
      ],
      comment: [
        [/[^*/]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[*/]/, 'comment']
      ]
    }
  });

  monaco.languages.setLanguageConfiguration('circom', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/']
    },
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ]
  });
}
