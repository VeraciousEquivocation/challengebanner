import React,{useEffect,useState} from 'react';
import clsx from 'clsx'
import scss from './banner.module.scss'
import food from '../../assets/images/food.png'
import pig from '../../assets/images/piggy-bank.jpg'
// This is the Circle element on the Cards, it changes it's icon, and styling, based on the passed in properties
// The policyId is used for testing, so the element can be grabbed and checked.

const Banner = ({active,policyId}) => {
    let [monthlySpend,setMonthlySpend] = useState(0)
    let [subscribed, setSubscribed] = useState(false)
    let [fadeIn, setFadeIn] = useState(true)
    let [fetching, setFetching] = useState(false)
    let [isOfferActive, setIsOfferActive] = useState(false)
    let [savings,setSavings] = useState(0)

    // Check session storage for subscription
    useEffect(()=>{
        // session value allows subscription to remain upon page refresh
        if(sessionStorage.getItem('subscribed'))
            setSubscribed(true)
    },[])

    // fetch to see if offer is active
    // timeout used to simulate data fetching, and to show animation
    useEffect(()=>{
        setFetching(true)
        setTimeout(()=>{
            fetch('data/index.json'
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            }
            )
              .then(function(response){
                if(response.status === 404) throw '404 not found'
                if(response.status === 408) throw '408 Timeout'
                return response.json();
              })
              .then(function(myJson) {
                setIsOfferActive(myJson.isOfferActive)
                setFetching(false)
              })
              .catch(e=>{
                  console.log('WOH THERE',e)
              });
        },1000)
    },[])

    // Calcualte the savings whenever monthlySpend value is changed in the input
    useEffect(() => {
        if(monthlySpend !== '') {
            calculateSavings()
        }

    },[monthlySpend])

    const roundToTwo = (num) => {
        return +(Math.round(num + "e+2")  + "e-2");
    }

    const calculateSavings = () => {
        let tempNum =roundToTwo((12 * monthlySpend) * 0.03)
        setSavings(tempNum)
    }

    // fade animation runs when subscribe is clicked
    const handleClickSubscribe = () => {
        if(!subscribed) {
            setFadeIn(false)
            setTimeout(()=>{
                setSubscribed(true)
                sessionStorage.setItem('subscribed', true);
                setFadeIn(true)
            },330)
        } 
    }

    // Allows the enter Key to submit the calculation
    const handleSubmit = (e) => {
        e.preventDefault()
        if(monthlySpend !== '')
            calculateSavings()
        else
            setSavings('')
    }

    return (
    <main className={scss.banner}>
        <div className={scss.topSection}>
            <section className={scss.topSectionLeft}>
              <header>
                  <div className={scss.left}>
                      <div>MY </div>
                      <div>BRAND</div>
                  </div>
                  <div className={scss.divider}></div>
                  <div className={scss.right}>
                      ENROLLMENT AVAILABLE
                      <div className={scss.date}>through 12/31/21</div>
                  </div>
              </header>
              <section className={scss.bgBlue}>
                  <div className={scss.limitedTime}>
                      <div className={scss.text}>for a limited time</div>
                  </div>
                  <div className={scss.bgEnjoy}>Enjoy a complimentary Food Pass subscription for up to 12-months</div>
                  <div className={scss.bgEnroll}>Enroll with your credit card and you could <strong>save up to ${fetching 
                    ? <><div className={clsx(scss.skeletonSmall,scss.skeleton)}></div><div className={clsx(scss.skeletonSmall,scss.skeleton,scss.two)}></div><div className={clsx(scss.skeletonSmall,scss.skeleton,scss.three)}></div> </>
                    : isOfferActive ? '139' : '119'}</strong> in subscription fees annually!</div>
                  <div className={clsx(scss.subscribeContainer,[fadeIn && scss.fadeIn])}>
                    {!subscribed
                    ? <div className={scss.bgDont}>
                        Don’t miss this opportunity!&nbsp;
                        <span className={scss.subscribe} onClick={handleClickSubscribe}>Click here to subscribe!</span>
                      </div>
                    : <div className={scss.bgDont}>Thank you for subscribing!</div>
                    }
                  </div>
              </section>
            </section>
            <figure className={scss.topSectionFigure}>
              <img src={food} alt={'food'} />
              <section className={scss.offerBox}>
                  <section className={scss.offerSection}>
                      <div>UP TO</div>
                      <div>${fetching 
                        ? <><div className={clsx(scss.skeletonLarge,scss.skeleton)}></div><div className={clsx(scss.skeletonLarge,scss.skeleton,scss.two)}></div><div className={clsx(scss.skeletonLarge,scss.skeleton,scss.three)}></div></>
                        : isOfferActive ? '139' : '119'}</div>
                      <div>IN VALUE</div>
                  </section>
              </section>
            </figure>
        </div>
        <section className={scss.bottomSection}>
            <figure className={scss.bottomFigure}>
              <img src={pig} alt={'piggy bank'} />
            </figure>
            <section className={scss.right}>
              <header className={scss.header}>Calculate Yearly Savings</header>
              <div className={scss.subTitle}>with the <span className={scss.yellow}>&nbsp;Food Plus Card</span></div>
              <div className={scss.calcRow}>
                  <section className={scss.left}>
                      <div className={scss.title}>Monthly Spending</div>
                      <div className={scss.box}>
                          <div className={scss.icon}>$</div>
                          <form onSubmit={handleSubmit}>
                          <input className={scss.number}
                            value={monthlySpend}
                            onChange={(event) => {
                              if (isFinite(event.target.value)) {
                              // UPDATE YOUR STATE (i am using formik)
                              setMonthlySpend(event.target.value);
                            }}} />
                            </form>
                      </div>
                  </section>
                  <section className={scss.right}>
                      <div className={scss.title}>Annual Savings</div>
                      <div className={scss.number}>${savings}</div>
                  </section>
              </div>
            </section>
        </section>
      </main>
    );
}

export default Banner;