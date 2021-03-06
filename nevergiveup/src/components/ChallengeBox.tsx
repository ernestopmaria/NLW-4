import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    const hasActiveChallenge = true
    return (
        <div className={styles.containerChallengeBox}>
            {hasActiveChallenge ? (<div className={styles.challengeActive}>

                <header>
                    Ganhe 400xp
                </header>
                <main>
                    <img src="icons/body.svg" alt="Body" />
                    <strong>Novo desafio</strong>
                    <p>Levante e faça uma caminhada de 3 minutos</p>
                </main>

                <footer>
                    <button type="button" className={styles.challengeFailed}>Falhei </button>
                    <button type="button" className={styles.challengeCompleted}>Completei </button>



                </footer>
            </div>) :


                (<div className={styles.challengeNotActive}>
                    <strong >
                        Finalize um ciclo para receber um desafio!</strong>
                    <p >
                        <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level complentando desafios.
                    </p>

                </div>)
            }

        </div >
    )


}