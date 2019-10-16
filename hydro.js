let currentOption = 0
let inMenu = false
let deg = 0
function Turn() {
    let g2 = sensors.gyro2
    let lAD = motors.largeAD
    lAD.tank(10, -10)
    deg = deg - 2.5
    g2.pauseUntilRotated(deg)
    lAD.tank(0, 0)
}

brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    if (currentOption == 1) {
        if (inMenu == true) {
            currentOption = 3
        }
    } else if (currentOption == 2) {
        if (inMenu == true) {
            currentOption = 1
        }
    } else {
        if (inMenu == true) {
            currentOption = 2
        }
    }
    if (currentOption == 1) {
        if (inMenu == true) {
            brick.showString("> 1. Rain/Fountain", 3)
            brick.showString("2. Pipe 1", 4)
            brick.showString("3. Exit", 5)
        }
    } else if (currentOption == 2) {
        if (inMenu == true) {
            brick.showString("1. Rain/Fountain", 3)
            brick.showString("> 2. Pipe 1", 4)
            brick.showString("3. Exit", 5)
        }
    } else if (currentOption == 3) {
        brick.showString("1. Rain/Fountain", 3)
        brick.showString("2. Pipe 1", 4)
        brick.showString("> 3. Exit", 5)
    }
})
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    if (currentOption == 1) {
        if (inMenu == true) {
            inMenu = false
            brick.showString(">> running 1 <<", 8)
            brick.setStatusLight(StatusLight.Orange)
            rainandfountain()
            brick.showString("", 8)
            brick.setStatusLight(StatusLight.Green)
            inMenu = true
        }
    } else if (currentOption == 2) {
        if (inMenu == true) {
            inMenu = false
            brick.showString(">> running 2 <<", 8)
            brick.setStatusLight(StatusLight.Orange)
            pipeTakeaway()
            brick.showString("", 8)
            brick.setStatusLight(StatusLight.Green)
            inMenu = true
        }
    } else if (currentOption == 3) {
        control.assert(false, 0)
    }
})
function rainandfountain() {
    motors.largeAD.tank(25, 25)
    pauseUntil(() => sensors.ultrasonic1.distance() < 29)
    motors.largeAD.tank(0, 0)
    motors.largeAD.pauseUntilReady()
    motors.mediumB.run(-5, 0.23, MoveUnit.Rotations)
    motors.mediumB.pauseUntilReady()
    motors.mediumB.run(5, 0.23, MoveUnit.Rotations)
    motors.mediumB.pauseUntilReady()
    motors.largeAD.tank(25, 25)
    pauseUntil(() => sensors.ultrasonic1.distance() < 15.8)
    motors.largeAD.tank(0, 0)
    motors.largeAD.pauseUntilReady()
    motors.mediumB.run(5, 0.26, MoveUnit.Rotations)
    motors.mediumB.pauseUntilReady()
    motors.mediumB.run(-5, 0.26, MoveUnit.Rotations)
    motors.mediumB.pauseUntilReady()
    motors.largeAD.tank(-40, -40)
    pauseUntil(() => sensors.ultrasonic1.distance() > 73)
    motors.largeAD.tank(0, 0)
    motors.largeAD.pauseUntilReady()
}

function pipeTakeaway() {
    let mtrs = motors.largeAD
    let tool = motors.mediumB
    mtrs.tank(20, 20)
    pauseUntil(() => sensors.ultrasonic1.distance() < 11.7)
    mtrs.tank(0, 0)
    mtrs.pauseUntilReady()
    deg = 90
    Turn()
    mtrs.pauseUntilReady()
    mtrs.tank(10, 10)
    pause(4000)
    tool.run(5, 30, MoveUnit.Degrees)
    tool.pauseUntilReady()
    mtrs.tank(-20, -20)
    pause(3000)
    mtrs.tank(0, 0)
    mtrs.pauseUntilReady()
    deg = 90
    Turn()
    mtrs.tank(20, 20)
    pauseUntil(() => sensors.ultrasonic1.distance() < 5)

}

function barrelYeet9000() {
    let mtrs = motors.largeAD
    let tool = motors.mediumB

}
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    if (currentOption == 1) {
        if (inMenu == true) {
            currentOption = 2
        }
    } else if (currentOption == 2) {
        if (inMenu == true) {
            currentOption = 3
        }
    } else if (currentOption == 3) {
        if (inMenu == true) {
            currentOption = 1
        }
    }
    if (currentOption == 1) {
        if (inMenu == true) {
            brick.showString("> 1. Rain/Fountain", 3)
            brick.showString("2. Pipe 1", 4)
            brick.showString("3. Exit", 5)
        }
    } else if (currentOption == 2) {
        if (inMenu == true) {
            brick.showString("1. Rain/Fountain", 3)
            brick.showString("> 2. Pipe 1", 4)
            brick.showString("3. Exit", 5)
        }
    } else if (currentOption == 3) {
        brick.showString("1. Rain/Fountain", 3)
        brick.showString("2. Pipe 1", 4)
        brick.showString("> 3. Exit", 5)
    }
})
inMenu = true
currentOption = 1
brick.showString("Hydrodynamics", 1)
brick.showString("> 1. Rain/Fountain", 3)
brick.showString("2. Pipe 1", 4)
brick.showString("3. Exit", 5)
brick.setStatusLight(StatusLight.Green)
