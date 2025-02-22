import React, { useState, useCallback, useEffect } from 'react';
import styles from './App.module.scss';

function App() {
    const [chatSettings, setNavbarOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovering(true), []);
    const handleMouseLeave = useCallback(() => setIsHovering(false), []);

    useEffect(() => {
        if (!isHovering) {
            setNavbarOpen(false);
        }
    }, [isHovering]);

    const handleClickOutside = useCallback(() => setNavbarOpen(false), []);
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
            <h1>Навигация Telegram</h1>
            <div className={styles.telegramNavbar}>
            <div className={`${styles.listContainer} ${chatSettings ? styles.active : ''}`}>
            <div className={styles.settingsButton} onClick={(event) => { setNavbarOpen(!chatSettings); createRipple(event); }}>
                        <span className={styles.line}></span>
                        <span className={styles.line}></span>
                    <span className={styles.line}></span>
                </div>
                <div className={styles.settingsModal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClickOutside}>
                    <div className={styles.other} onClick={handleClickInside}>
                        <div className={styles.block}>
                            <img src="https://vk.com/images/camera_200.png" alt="User" />
                            <div className={styles.title}>Sasha</div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Добавить аккаунт</div>
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Избранное</div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Архив</div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Мои истории</div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Контакты</div>
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Кошелёк</div>
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Настройки</div>
                        </div>
                        <div className={styles.block}>
                            <div className={styles.icon}>♺</div>
                            <div className={styles.title}>Ещё</div>
                            <div className={styles.arrow}>
                                <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.171 12.1103 15.25 12.3011 15.25 12.5C15.25 12.6989 15.171 12.8897 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.editor}>CSS Анимация by Kondakov</div>
        </div>
        </div>
    );
}

export default App;