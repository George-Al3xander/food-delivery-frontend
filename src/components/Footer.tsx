



const Footer = () => {
    const handleClickScroll = () => {
        const element  = document.querySelector("header");
        if (element) {            
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return(<footer className="p-[3%] max-w-6xl mx-auto flex flex-col justify-center gap-4 items-center text-center md:items-start  md:gap-0  md:flex-row md:justify-between md:text-left">
        <div>
            <h1 className="text-4xl hidden md:inline italic font-bold text-primary">Texas Toast</h1> 
             <h3 className="text-lg font-medium pb-5">Delivery</h3>
             <ul className="flex flex-col gap-2">
                <li>
                    <p className="flex items-center gap-1"><svg className="fill-green-500" xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15"><path d="M480.276-96Q401-96 331-126q-70-30-122.5-82.5T126-330.958q-30-69.959-30-149.5Q96-560 126-629.5t82.5-122Q261-804 330.958-834q69.959-30 149.5-30Q560-864 629.5-834t122 82.5Q804-699 834-629.276q30 69.725 30 149Q864-401 834-331q-30 70-82.5 122.5T629.276-126q-69.725 30-149 30Z"/></svg>Working from 10:00 to 21:50</p>
                </li>
                <li>
                    <a className="text-primary hover:opacity-60 transition-all duration-300" href="tel:+380992202211">+380 (99) 220 22 11</a>
                </li>
             </ul>
        </div>
        <button onClick={handleClickScroll} className="flex items-center gap-2 bg-secondary p-3 rounded-md text-sm font-medium hover:scale-105 hover:opacity-60 transition-all duration-500 hover:cursor-pointer">Back to top<svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M480-525 291-336l-51-51 240-240 240 240-51 51-189-189Z"/></svg></button>
    </footer>)
}

export default Footer