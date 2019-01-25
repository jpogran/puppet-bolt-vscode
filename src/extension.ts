import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "puppet-bolt-vscode" is now active!');

  let disposable = vscode.commands.registerCommand('puppet-bolt.NewTask', () => {
    vscode.window
      .showQuickPick(['PowerShell', 'Python', 'bash'], {
        placeHolder: 'Choose a language to start',
        canPickMany: false,
      })
      .then(taskType => {
        let workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders === undefined) {
          return;
        }
        // TODO how do we get the folder we're 'in'
        let root = workspaceFolders[0].uri;

        // - if no metadata.json throw warning that you should be creating tasks inside modules, non terminating
        // - inspects current directory
        //   - if no tasks folder, creates task folder and init.json and init.language-ext
        if (!fs.existsSync(path.join(root.fsPath, 'tasks'))) {
          fs.mkdirSync(path.join(root.fsPath, 'tasks'));
          switch (taskType) {
            case 'PowerShell':
              let ps1File = path.join(root.fsPath, 'tasks', 'init.ps1');
              let ps1Json = path.join(root.fsPath, 'tasks', 'init.json');

              // static injection ftw
              fs.writeFile(ps1File, '# type bolt-pwsh to begin!', function(err) {});
              fs.writeFile(ps1Json, '{}', function(err) {});

              vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(ps1File), false);
              break;
            default:
              break;
          }
          return;
        }

        // - if tasks folder, creates task-name.language-ext and task-name.json
        // - if any is present fails with error
        switch (taskType) {
          case 'PowerShell':
            let ps1File = path.join(root.fsPath, 'tasks', 'pwsh.ps1');
            let ps1Json = path.join(root.fsPath, 'tasks', 'pwsh.json');

            // static injection ftw
            fs.writeFile(ps1File, '# type bolt-pwsh to begin!', function(err) {});
            fs.writeFile(ps1Json, '{}', function(err) {});
            vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(ps1File), false);
            break;
          default:
            break;
        }
      });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
