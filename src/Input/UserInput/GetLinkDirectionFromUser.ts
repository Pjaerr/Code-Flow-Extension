import * as vscode from 'vscode';

export const enum LinkDirection {
  NoLink = 'No Link',
  To = 'Link to another Data Point',
  From = 'Be linked to by another Data Point'
}

/**
 * Let the user choose a link direction
 *
 * @return Returns a LinkDirection enum
 */
export const GetLinkDirectionFromUser = async () => {
  const chosenDirection = await vscode.window.showQuickPick(
    [LinkDirection.NoLink, LinkDirection.To, LinkDirection.From],
    {
      placeHolder: 'Choose Link Direction'
    }
  );

  if (!chosenDirection) {
    throw Error('User exited the quick pick');
  }

  if (chosenDirection === LinkDirection.NoLink) {
    return LinkDirection.NoLink;
  }

  return chosenDirection === LinkDirection.To ? LinkDirection.To : LinkDirection.From;
};
