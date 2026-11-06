/**
 * code.ts
 * - 플러그인 진입점
 * - UI 화면 표시 + UI에서 보낸 메시지를 받아 builders로 분기
 */

// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// TODO: messages.ts 정의 후 figma.ui.onmessage 작성

figma.showUI(__html__, { width: 360, height: 560, themeColors: true });