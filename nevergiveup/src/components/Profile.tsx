import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/58423237?s=400&u=f39d1d5e73424473bc991b93bb36566ecb015b76&v=4" alt="Ernrsto Maria" />
            <div>
                <strong>Ernesto Maria</strong>
                <p><img src="icons/level.svg" alt="Level" /> Level 1</p>
            </div>
        </div>
    )
}