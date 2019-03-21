/*This file contains functions that are to be used as a validateInput function on the vscode.window.ShowInputBox()
InputBoxOptions object.*/

/**
	 * Checks if the text passed in is only a number.
	 *
	 * @param text The text to check for a number
	 * @return A string telling the user that they must enter a number.
 */
export const isANumber = (text: string) => text.match(/^[0-9]*$/gm) ? '' : 'You must enter a number!';