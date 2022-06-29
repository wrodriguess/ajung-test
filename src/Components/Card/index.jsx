import './style.css';

function Card({srcImg, slug, productId}){
    return(
        <div id="card-content">
            <img src={srcImg} alt={slug}/>
            <strong>{slug}</strong>
            <p>{productId}</p>
        </div>
    );
}

export default Card;