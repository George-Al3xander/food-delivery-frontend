



const Footer = () => {
    const handleClickScroll = () => {
        const element  = document.querySelector("header");
        if (element) {            
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return(<footer>
        <div className="footer-main-info">
            <h1 className="logo">Texas Toast</h1> 
             <h3>Delivery</h3>
             <ul>
                <li>
                    <p><svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480.276-96Q401-96 331-126q-70-30-122.5-82.5T126-330.958q-30-69.959-30-149.5Q96-560 126-629.5t82.5-122Q261-804 330.958-834q69.959-30 149.5-30Q560-864 629.5-834t122 82.5Q804-699 834-629.276q30 69.725 30 149Q864-401 834-331q-30 70-82.5 122.5T629.276-126q-69.725 30-149 30Z"/></svg>Working from 10:00 to 21:50</p>
                </li>
                <li>
                    <a href="tel:+380992202211">+380 (99) 220 22 11</a>
                </li>
             </ul>
        </div>
        <button onClick={handleClickScroll} className="btn-scroll-top">Back to top<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M480-525 291-336l-51-51 240-240 240 240-51 51-189-189Z"/></svg></button>
    </footer>)
}

export default Footer