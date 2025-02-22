import React, { useState, useCallback, useEffect } from 'react';
import styles from './App.module.scss';

function App() {
    const [telegramButton, settelegramButton] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => setIsHovering(false), []);

    useEffect(() => {
        if (!isHovering) {
            settelegramButton(false);
        }
    }, [isHovering]);

    const handleClickOutside = useCallback(() => settelegramButton(false), []);
    const handleClickInside = useCallback((e) => e.stopPropagation(), []);

    const createRipple = (event) => {
        const block = event.currentTarget;
        const circle = document.createElement('span');
        const rect = block.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${event.clientX - rect.left - size / 2}px`;
        circle.style.top = `${event.clientY - rect.top - size / 2}px`;
        circle.className = styles.ripple;

        block.appendChild(circle);

        circle.addEventListener('animationend', () => {
            circle.remove();
        });
    };

    return (
        <div className={styles.content}>
            <h1>CSS популярных приложений</h1>
            <h2>Кнопка Telegram</h2>
            <div className={styles.telegramButton}>
                <div className={`${styles['list-container']} ${telegramButton ? styles.active : ''}`}>
                    <div
                        className={styles.settingsButton}
                        onClick={(event) => {
                            settelegramButton(!telegramButton);
                            createRipple(event);
                        }}
                    >
                        <svg className={styles.iconPencil} xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-pencil" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                                fill='#FFFFFF' />
                        </svg>
                        <svg className={styles.iconClose} xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="mdi-close" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                                fill='#FFFFFF' />
                        </svg>
                    </div>
                    <div className={styles.settingsModal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickOutside}>
                        <div className={styles.other} onClick={handleClickInside}>
                            <div className={styles.block}>
                                <div className={styles.icon}>🔗</div>
                                <div className={styles.title}>Создать канал</div>
                            </div>
                            <div className={styles.block}>
                                <div className={styles.icon}>🔗</div>
                                <div className={styles.title}>Создать группу</div>
                            </div>
                            <div className={styles.block}>
                                <div className={styles.icon}>🔗</div>
                                <div className={styles.title}>Начать личный чат</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;