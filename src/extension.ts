import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "puppet-bolt-vscode" is now active!');

  let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
