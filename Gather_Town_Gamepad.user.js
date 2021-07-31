// ==UserScript==
// @name         Gather Town with Game Controller
// @namespace    https://github.com/FrankWu100/Gather_Town_Gamepad
// @version      0.2
// @description  Playing Gather Town with Game Controller!
// @author       Frank Wu
// @match        https://gather.town/app/*
// @icon         https://assets-global.website-files.com/60ca686c96b42034829a80d3/60e62da77ae7c7a1fe15f1fa_Circle%20(1).png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    var haveEvents = 'GamepadEvent' in window;
    var haveWebkitEvents = 'WebKitGamepadEvent' in window;
    var rAF = window.requestAnimationFrame;
    //window.mozRequestAnimationFrame ||
    //window.webkitRequestAnimationFrame ||
    var frameCount = 0;

    var buttonsHolds = {};
    var axesHolds = {};

    function connecthandler(e) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index, e.gamepad.id,
                    e.gamepad.buttons.length, e.gamepad.axes.length);

        var buttonsHold = {};
        buttonsHolds[e.gamepad.index] = buttonsHold;

        var axesHold = {};
        axesHolds[e.gamepad.index] = axesHold;

        for (var i = 0; i < e.gamepad.buttons.length; i++) {
            buttonsHold[i] = false;
        }

        for (var i = 0; i < e.gamepad.axes.length; i++) {
            axesHold[i] = false;
        }

        rAF(gameLoop);
    }

    function disconnecthandler(e) {
        console.log("Gamepad disconnected from index %d: %s",
                    e.gamepad.index, e.gamepad.id);
    }

    function gameLoop() {

        var controllers = navigator.getGamepads();
        for (var id = 0; id < controllers.length; id++) {
            var controller = controllers[id];

            if (controller != null) {
                // L Stick
                var L_X = controller.axes[0]; //left -1, right 1
                var L_Y = controller.axes[1]; //up -1, down 1

                if (Math.abs(L_X) > Math.abs(L_Y) && Math.abs(L_X) > 0.3) {
                    axesHolds[id][0] = true;
                    if (L_X > 0) {
                        // L Right
                        console.log("L Right");
                        simulateKeyPress("keydown", "D");
                    } else {
                        // L Left
                        console.log("L Left");
                        simulateKeyPress("keydown", "A");
                    }
                }

                if (Math.abs(L_X) <= 0.3) {
                    if (axesHolds[id][0] == true) {
                        simulateKeyPress("keyup", "D");
                        simulateKeyPress("keyup", "A");
                        axesHolds[id][0] = false;
                    }
                }

                if (Math.abs(L_Y) > Math.abs(L_X) && Math.abs(L_Y) > 0.3) {
                    axesHolds[id][1] = true;
                    if (L_Y > 0) {
                        // L Down
                        console.log("L Down");
                        simulateKeyPress("keydown", "S");
                    } else {
                        // L Up
                        console.log("L Up");
                        simulateKeyPress("keydown", "W");
                    }
                }

                if (Math.abs(L_Y) <= 0.3) {
                    if (axesHolds[id][1] == true) {
                        simulateKeyPress("keyup", "S");
                        simulateKeyPress("keyup", "W");
                        axesHolds[id][1] = false;
                    }
                }

                var R_X = controller.axes[2]; //left -1, right 1
                var R_Y = controller.axes[3]; //up -1, down 1

                if (Math.abs(R_X) > Math.abs(R_Y) && Math.abs(R_X) > 0.3) {
                    if (R_X > 0) {
                        // R Right
                        console.log("R Right");

                    } else {
                        // R Left
                        console.log("R Left");

                    }
                }

                if (Math.abs(R_Y) > Math.abs(R_X) && Math.abs(R_Y) > 0.3) {
                    if (R_Y > 0) {
                        // R Down
                        console.log("R Down");

                    } else {
                        // R Up
                        console.log("R Up");

                    }
                }

                // Button Down
                for (var i = 0; i < controller.buttons.length; i++) {
                    var b = controller.buttons[i];
                    var pressed = false;
                    if (b.value > 0 || b.pressed == true) {
                        if (buttonsHolds[id][i] == false) {
                            buttonsHolds[id][i] = true;
                            switch (i) {
                                case 0:
                                    console.log("A");
                                    simulateKeyPress("keydown", "G");
                                    break;
                                case 1:
                                    console.log("B");
                                    simulateKeyPress("keydown", "Escape");
                                    break;
                                case 2:
                                    console.log("X");
                                    simulateKeyPress("keydown", "X");
                                    break;
                                case 3:
                                    console.log("Y");
                                    simulateKeyPress("keydown", "Z");
                                    break;
                                case 4:
                                    console.log("LB");
                                    break;
                                case 5:
                                    console.log("RB");
                                    break;
                                case 6:
                                    console.log("LT");
                                    //support press value
                                    break;
                                case 7:
                                    console.log("RT");
                                    //support press value
                                    break;
                                case 8:
                                    console.log("Sellect/Window");
                                    break;
                                case 9:
                                    console.log("Start/Setting");
                                    break;
                                case 10:
                                    console.log("L Stick");
                                    break;
                                case 11:
                                    console.log("R Stick");
                                    break;
                                case 12:
                                    console.log("Up");
                                    break;
                                case 13:
                                    console.log("Down");
                                    break;
                                case 14:
                                    console.log("Left");
                                    break;
                                case 15:
                                    console.log("Right");
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                };

                // Button Up / release
                for (var i = 0; i < controller.buttons.length; i++) {
                    var b = controller.buttons[i];
                    var pressed = false;
                    if (b.value == 0 || b.pressed == false) {
                        if (buttonsHolds[id][i] == true) {
                            switch (i) {
                                case 0:
                                    console.log("A");
                                    simulateKeyPress("keyup", "G");
                                    break;
                                case 1:
                                    console.log("B");
                                    simulateKeyPress("keyup", "Escape");
                                    break;
                                case 2:
                                    console.log("X");
                                    simulateKeyPress("keyup", "X");
                                    break;
                                case 3:
                                    console.log("Y");
                                    simulateKeyPress("keyup", "Z");
                                    break;
                                case 4:
                                    console.log("LB");
                                    break;
                                case 5:
                                    console.log("RB");
                                    break;
                                case 6:
                                    console.log("LT");
                                    //support press value
                                    break;
                                case 7:
                                    console.log("RT");
                                    //support press value
                                    break;
                                case 8:
                                    console.log("Sellect/Window");
                                    break;
                                case 9:
                                    console.log("Start/Setting");
                                    break;
                                case 10:
                                    console.log("L Stick");
                                    break;
                                case 11:
                                    console.log("R Stick");
                                    break;
                                case 12:
                                    console.log("Up");
                                    break;
                                case 13:
                                    console.log("Down");
                                    break;
                                case 14:
                                    console.log("Left");
                                    break;
                                case 15:
                                    console.log("Right");
                                    break;
                                default:
                                    break;
                            }
                            buttonsHolds[id][i] = false;
                        }
                    }
                };
            }
        }

        var start = rAF(gameLoop);
    };

    if (haveEvents) {
        window.addEventListener("gamepadconnected", connecthandler);
        window.addEventListener("gamepaddisconnected", disconnecthandler);
    } else if (haveWebkitEvents) {
        window.addEventListener("webkitgamepadconnected", connecthandler);
        window.addEventListener("webkitgamepaddisconnected", disconnecthandler);
    }

    function simulateKeyPress(type, key) {
        if (document.hasFocus()) {
            document.body.dispatchEvent(
                new KeyboardEvent(type, {
                    key: key
                })
            );
        }
    }

})();
