import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.scss';

const App = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const contentRefs = useRef([]);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        if (activeIndex !== null) {
            const contentElement = contentRefs.current[activeIndex];
            contentElement.style.maxHeight = contentElement.scrollHeight + 'px';
        }

        contentRefs.current.forEach((ref, index) => {
            if (index !== activeIndex && ref) {
                ref.style.maxHeight = null;
            }
        });
    }, [activeIndex]);

    const accordionData = [
        {
            question: 'Вопрос 1',
            answer: 'Ответ на вопрос 1. Здесь может быть много текста, который будет скрыт и показан при нажатии на заголовок.',
            icon: 'svg'
        },
        {
            question: 'Вопрос 2',
            answer: 'Ответ на вопрос 2. Еще больше текста, который можно скрыть или показать.',
            icon: 'plus'
        },
        {
            question: 'Вопрос 3',
            answer: 'Ответ на вопрос 3. И еще один блок с текстом.',
            icon: 'burger'
        }
    ];

    return (
        <div className={styles.content}>
            <h2>Аккордеон в стиле Google/YouTube</h2>
            <div className={styles.accordion}>
                {accordionData.map((item, index) => (
                    <div key={index} className={`${styles.accordionItem} ${activeIndex === index ? styles.active : ''}`}>
                        <div className={styles.accordionHeader} onClick={() => handleClick(index)}>
                            <span>{item.question}</span>
                            <span className={styles.icon}>
                                {item.icon === 'svg' && (
                                    <svg viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path transform="rotate(90 12 12.5)" fillRule="evenodd" clipRule="evenodd"
                                            d="M8.96967 18.0303C8.67678 17.7374 8.67678 17.2626 8.96967 16.9697L13.4393 12.5L8.96967 8.03033C8.67678 7.73744 8.67678 7.26256 8.96967 6.96967C9.26256 6.67678 9.73744 6.67678 10.0303 6.96967L15.0303 11.9697C15.171 12.1103 15.25 12.3011 15.25 12.5C15.25 12.6989 15.171 12.8897 15.0303 13.0303L10.0303 18.0303C9.73744 18.3232 9.26256 18.3232 8.96967 18.0303Z" />
                                    </svg>
                                )}
                                {item.icon === 'plus' && '+'}
                                {item.icon === 'burger' && (
                                    <span className={styles.iconBURGER}>
                                        <span className={styles.line}></span>
                                        <span className={styles.line}></span>
                                        <span className={styles.line}></span>
                                    </span>
                                )}
                            </span>
                        </div>
                        <div
                            ref={el => contentRefs.current[index] = el}
                            className={styles.accordionContent}
                        >
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;