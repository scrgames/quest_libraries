﻿// ----------------------------------------------------------------------------------------------------
// CommandBar with Own Cursor
// by EightOne, 2017
// Version 1.3
// ----------------------------------------------------------------------------------------------------
// Quest-Version: 5.7
// ----------------------------------------------------------------------------------------------------
// Just download the OwnCursor.js and integrate it as javascript in Quest.
// ----------------------------------------------------------------------------------------------------

// Version 1.3
// incompatibility with DevMode removed.
// OwnCursor can now be activated and deactivated with OwnCurActive so that the script does not have to
// be removed. The OwnCurInputOn and OwnCurInputOff functions can be used to temporarily deactivate and
// reactivate the keypress and keydown event.
// ----------------------------------------------------------------------------------------------------
// Version 1.2
// bugfix from after clicking a button the command bar did not empty itself.
// ----------------------------------------------------------------------------------------------------
// Version 1.1
// bugfix for accidental invocation of commands that were previously executed by buttons.
// ----------------------------------------------------------------------------------------------------

(function ($) {
    // --------------------------------------------------------------------------------------------------------------
    var OwnCurActive = true; // owncursor on and off
    // --------------------------------------------------------------------------------------------------------------
    var OwnCurCursor = '█'; // cursor
    //var OwnCurCursor = " "; // without cursor
    //var OwnCurCursor = "_"; // alternate cursors
    //var OwnCurCursor = "▌";
    //var OwnCurCursor = "▄";
    //var OwnCurCursor = "●";
    //var OwnCurCursor = "►";
    var OwnCurCursorLen = OwnCurCursor.length;
    // --------------------------------------------------------------------------------------------------------------
    var OwnCurBlinking = false; // determines whether the cursor flashes.
    var OwnCurBlinkinterval = 500; // how often the cursor of the indicated milliseconds should blink.
    // --------------------------------------------------------------------------------------------------------------
    var OwnCurBlinkcursor = ' '; // without blinkcursor
    //var OwnCurBlinkcursor = "▄"; // cursor, the one is replaced with the blinking. can be customized with any cursor.
    var OwnCurBlinkcursorLen = OwnCurBlinkcursor.length;
    // --------------------------------------------------------------------------------------------------------------
    if (OwnCurBlinking)
        window.setInterval(OwnCurItsBlinking, OwnCurBlinkinterval);
    // --------------------------------------------------------------------------------------------------------------

    if (OwnCurActive) {
        $('#txtCommand').ready(function () {
            OwnCurInit();
            OwnCurInputOn();
        });

        function OwnCurInputOn() {
            $(document).keydown(function (event) {
                OwnCurInput(event, 'keydown');
            });
            $(document).keypress(function (event) {
                OwnCurInput(event, 'keypress');
            });
            $(document).mouseup(function (event) {
                $('#txtCommand').val(OwnCurCursor);
            });
        }

        function OwnCurInputOff() {
            $(document).off('keydown');
            $(document).off('keypress');
            $(document).off('mouseup');
        }

        function OwnCurInit() {
            var cmdbar = $('#txtCommand'); // commandbar-reference
            cmdbar.css('height', '26px'); // with some buttons it may be necessary to adjust the height of the CommandBar.
            cmdbar.prop('disabled', true);
            cmdbar.val(OwnCurCursor);
        }

        function OwnCurInput(event, typ) {
            var cmdbar = $('#txtCommand'); // commandbar-reference
            if (
                typeof event !== 'undefined' &&
                event.target.nodeName !== 'INPUT'
            ) {
                var key = event.which; // keycode
                var strkey = String.fromCharCode(key); // key

                if (typ === 'keydown' && key === 8) {
                    // backspace
                    event.preventDefault();
                    var text =
                        cmdbar.val().slice(0, -(OwnCurCursorLen + 1)) +
                        OwnCurCursor;
                    cmdbar.val(text);
                } else if (typ === 'keydown' && key === 32) {
                    // space
                    event.preventDefault();
                    var text =
                        cmdbar.val().slice(0, -OwnCurCursorLen) +
                        ' ' +
                        OwnCurCursor;
                    cmdbar.val(text);
                } else if (
                    typ === 'keydown' &&
                    (key === 13 || key === 38 || key === 40 || key === 27)
                ) {
                    // return, etc.
                    event.preventDefault();
                    var text = cmdbar.val().slice(0, -OwnCurCursorLen);
                    cmdbar.val(text);
                    commandKey(event);
                    var text = cmdbar.val() + OwnCurCursor;
                    cmdbar.val(text);
                } else if (typ === 'keypress') {
                    // another key
                    event.preventDefault();
                    var text =
                        cmdbar.val().slice(0, -OwnCurCursorLen) +
                        strkey +
                        OwnCurCursor;
                    cmdbar.val(text);
                }
            }
        }

        function OwnCurItsBlinking() {
            var cmdbar = $('#txtCommand');
            if (cmdbar.length > 0) {
                var lastchar = cmdbar.val().slice(-OwnCurCursorLen);
                if (lastchar === OwnCurCursor)
                    var text =
                        cmdbar.val().slice(0, -OwnCurCursorLen) +
                        OwnCurBlinkcursor;
                else
                    var text =
                        cmdbar.val().slice(0, -OwnCurBlinkcursorLen) +
                        OwnCurCursor;
                cmdbar.val(text);
            }
        }
    }
})(jQuery);

// ----------------------------------------------------------------------------------------------------
