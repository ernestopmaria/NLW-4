import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondsRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        setsActive(true)

    }

    function stoptCountdown() {
        clearTimeout(countdownTimeout)
        setsActive(false)
        setTime(0.1 * 60)


    }

    useEffect(() => {
        if (!isActive && time > 0) {
            setTime(0.1 * 60)
        }

    })



    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setsActive(false)
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>

                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>
            {hasFinished ? (<button disabled className={styles.countdownButtonStop}

            >Ciclo encerrado</button>
            ) : (
                    <>
                        {isActive ? (<button type="button" className={styles.countdownButtonStop}
                            onClick={stoptCountdown}
                        >Abandonar ciclo</button>) : (


                                <button type="button" className={styles.countdownButton}
                                    onClick={startCountdown}
                                > Iniciar um ciclo
                                </button>
                            )}
                    </>
                )}


        </div>
    )
}