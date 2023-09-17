import React from 'react'
import './Social.scss'
import TelegramIcon from '../../assets/telegram-icon.svg'
import WhatsAppIcon from '../../assets/whatsapp-icon.svg'
import EmailIcon from '../../assets/email-icon.svg'

interface ISocial {
    location?: string
}

const Social: React.FC<ISocial> = (props) => {
    const { location } = props
    return (
        <div className={`social social-${location}`}>
            <a href="https://t.me/smokyzoncorp" title="Smokyzon Telegram">
                <img src={TelegramIcon} alt="Smokyzon Telegram" />
                <span className="footer__social__">@smokyzoncorp</span>
            </a >
            <a href="https://t.me/smokyzoncorp" title="Smokyzon WhatsApp">
                <img src={WhatsAppIcon} alt="Smokyzon WhatsApp" />
                <span className="">+7 989 095-77-88</span>
            </a>
            <a href="mailto:smokyzon@mail.ru" title="Smokyzon Email">
                <img src={EmailIcon} alt="Smokyzon Email" />
                <span className="">smokyzon@mail.ru</span>
            </a>
        </div >
    )
}

export default Social