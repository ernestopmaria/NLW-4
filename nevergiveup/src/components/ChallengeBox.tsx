import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    return (
        <div className={styles.containerChallengeBox}>
            <div>
                <strong className={styles.challengeNotActive}>
                    Finalize um ciclo para receber um desafio!</strong>
                <p >
                    <img src="icons/level.svg" alt="Level Up" />
                        Avance de level complentando desafios.
                    </p>

            </div>

        </div>
    )


}