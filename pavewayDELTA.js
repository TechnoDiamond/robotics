/*
  pavewayDELTA
  programmed by VoidDiamond#2271 (disc)
  for study ONLY, not to be redistributed
  if you do, omega bad.
*/

brick.showString("PAVEWAY:Δ startup", 1)
brick.setStatusLight(StatusLight.Red)
pause(1000)
let isProgramRunning = false
let menuType = "main"
let currentOp = 0
let config = {
    turndir: "right",
    consec180: true
}
let mtrs = motors.largeAD
mtrs.setBrake(true)
mtrs.setBrakeSettleTime(1)
let recentlyTurned = false
let turnFinishAngle = 0
let currentConfigOp = 0
brick.showString("VARIABLES: loaded", 2)
function updateUi() {
    if (menuType == "main") {
        brick.showString("PAVEWAY:Δ main menu", 1)
        if (currentOp == 0 && menuType == "main") {
            brick.showString("> Start", 3)
            brick.showString("Configure", 4)
        } else if (currentOp == 1 && menuType == "main") {
            brick.showString("Start", 3)
            brick.showString("> Configure", 4)
        }
    } else if (menuType == "config") {
        brick.showString("PAVEWAY:Δ config", 1)
        //brick.showString("> turndir: right", 3)
        //brick.showString("180consec: false", 4)
        control.assert(false, 5)
        if (currentOp == 0 && menuType == "config") {
            brick.showString("> turndir: " + config.turndir, 3)
            brick.showString("180consec: " + config.consec180.toString(), 4)
        } else if (currentOp == 1 && menuType == "config") {
            brick.showString("turndir: " + config.turndir, 3)
            brick.showString("> 180consec: " + config.consec180.toString(), 4)
        }
    }
}
control.assert(false, 5)
brick.showString("FUNCTIONS: loaded", 3)
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    if (currentOp == 0 && menuType == "main") {
        currentOp = 1
    } else if (currentOp == 1 && menuType == "main") {
        currentOp = 0
    } else if (currentOp == 0 && menuType == "config") {
        currentOp = 1
    } else if (currentOp == 1 && menuType == "config") {
        currentOp = 0
    }
    updateUi()
})
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    // Change variable
    if (currentOp == 0 && menuType == "main") {
        currentOp = 1
    } else if (currentOp == 1 && menuType == "main") {
        currentOp = 0
    } else if (currentOp == 0 && menuType == "config") {
        currentOp = 1
    } else if (currentOp == 1 && menuType == "config") {
        currentOp = 0
    }
    // Change UI
    updateUi()
})
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    // Change variable
    if (menuType == "config") {
        menuType = "main"
    }
    // Change UI
    updateUi()
})
brick.buttonRight.onEvent(ButtonEvent.Pressed, function () {
    if (menuType == "main" && currentOp == 1) {
        menuType = "config"
    } else if (menuType == "main" && currentOp == 0) {
        if (isProgramRunning == false) {
            isProgramRunning = true
            brick.showString("Running main program...", 6)
            brick.setStatusLight(StatusLight.OrangePulse)
        } else {
            isProgramRunning = false
            brick.showString("                         ", 6)
            brick.setStatusLight(StatusLight.Green)
        }
    } else if (menuType == "config" && currentOp == 0) {
        if (config.turndir == "right") {
            config.turndir = "left"
        } else {
            config.turndir = "right"
        }
    } else if (menuType == "config" && currentOp == 1) {
        if (config.consec180 == true) {
            config.consec180 = false
        } else {
            config.consec180 = true
        }
    }
    updateUi()
})
brick.showString("MENU: loaded", 4)
brick.showString("calibrating gyro; no move pls", 5)
pause(1500)
sensors.gyro1.calibrate()
sensors.gyro1.computeDrift()
brick.showString("gyro recalibrated", 6)
pause(500)
brick.clearScreen()

control.assert(false, 5)
brick.showString("Clearing in 2.5s", 6)
brick.showString("Loading completed", 7)
pause(2500)
brick.clearScreen()
control.assert(false, 5)
brick.setStatusLight(StatusLight.Green)
updateUi()
loops.forever(function () {
    if (isProgramRunning == true) {
        mtrs.run(60)
        pauseUntil(() => sensors.ultrasonic4.distance() < 9)
        mtrs.stop()
        if (100 > (motors.largeA.angle() - turnFinishAngle) && -100 < (motors.largeA.angle() - turnFinishAngle)) {
            recentlyTurned = true
        } else {
            recentlyTurned = false
        }
        if (recentlyTurned == false) {
            if (config.turndir == "right") {
                mtrs.tank(30, -30)
                sensors.gyro1.pauseUntilRotated(75)
                mtrs.stop()
            } else {
                mtrs.tank(-30, 30)
                sensors.gyro1.pauseUntilRotated(-75)
                mtrs.stop()
                control.assert(false, 5)
            }
        } else if (recentlyTurned == true && config.consec180 == true) {
            if (config.turndir == "left") {
                mtrs.tank(30, -30)
                sensors.gyro1.pauseUntilRotated(75)
                mtrs.stop()
                mtrs.tank(30, -30)
                sensors.gyro1.pauseUntilRotated(77)
                mtrs.stop()
            } else {
                mtrs.tank(-30, 30)
                sensors.gyro1.pauseUntilRotated(-75)
                mtrs.stop()
                mtrs.tank(-30, 30)
                sensors.gyro1.pauseUntilRotated(-77)
                mtrs.stop()
            }
        }
        mtrs.pauseUntilReady()
        turnFinishAngle = motors.largeA.angle()
        \control.assert(false, 5)
    }
})
