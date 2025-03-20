import Button from '../../components/form/button/Button'
import ProductCard from '../../components/product/ProductCard'
import './LocationDetail.scss'

export default function LocationDetail() {

  const images = [
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__",
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__",
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__",
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__",
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__",
    "https://s3-alpha-sig.figma.com/img/095f/6a94/fc06f2a986d505488672142d83047b55?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JNldAAPShgZASCnY1ShUlOpLNPPJn-I~Tf41MQuT3W22XVuJX03IKmRg1s9oZgtDFhgajFMlfr0p2JK~bQRlVIjKfvqdIVWP4qcEYegmGHQpr1xQ-q2jo3vwnSdMUkCCGGA1x4gOfmtGWGyhdGGeyYMrPYZDnXjC0ynax9TZDWdqjR1K95tS7phgky82DgipkqInhP0F1mJ3PS-HoMBx7wny24iq4Qq~PgbKk-rLhZ053OxCV~l60YdNvGRrMb8QkKhQ8sA--yZJiDkdXMUBClrFzKmSo4mGFNdwMOHNOqew8kqzeHu0wumYsHOxH80mGpa8TSzLl6CWSQ0DY5HmPA__,"
  ]

  const specifications = [
    {
        icon: "/icons/transmission.png",
        name: "Manuelle",
    },
    {
        icon: "/icons/calendar.png",
        name: "2018",
    },
    {
        icon: "/icons/vmaxx.png",
        name: "220 km/h",
    },
    {
        icon: "/icons/wind.png",
        name: "0-100: 3.2s",
    },
    {
        icon: "/icons/tree.png",
        name: "Crit'air 1",
    }
  ]

  return (
    <div className='location-detail'>

        <div className="first-section">
            <div className="titles">
                <h2>Sportive</h2>
                <h1>NISSAN R35 GT-R</h1>
                <p>Too far is never far enough. Until we can design the very atoms of the materials in the car ourselves, we won’t stop. In the meantime, we’ve got our eye on every observable detail of the HF-11. Nothing is taken at face value, every component is interrogated, every function must dovetail perfectly with all others in an impossible pursuit of mechanical singularity. The devil’s never seen details like these. *Pre-production images shown.</p>
            </div>
        
            <div className="image-display">
                <div className="img-container">
                    <img src={images[0]} alt="" />
                </div>
                <div className='row'>
                    <div className='img-container'
                    style={{height:"50%"}}
                    >
                        <img src={images[1]} alt="" />
                    </div>
                    <div className='column'>
                        <div className='img-container'>
                            <img src={images[2]} alt="" />
                        </div>
                        <div className='img-container'>
                            <img src={images[3]} alt="" />
                            <p className='number'>{images.length-4}+</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className='specifications'>
            <h3>Spécifications</h3>
            <div className="list">
                {
                    specifications.map((spec, index) => {
                        return (
                            <div className="specification">
                                <img src={spec.icon} alt="" />
                                <p>{spec.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        <div className="vehicules-similaires">
            <h3>Véhicules similaires</h3>
            <div className="horizontal-scroll">
                <ProductCard isLight minWidth='32rem'/>
                <ProductCard isLight minWidth='32rem'/>
                <ProductCard isLight minWidth='32rem'/>
                <ProductCard isLight minWidth='32rem'/>
                <ProductCard isLight minWidth='32rem'/>
                <ProductCard isLight minWidth='32rem'/>
            </div>
        </div>

        <div className="sticky-bottom">
            <div className="container">
                <div className="infos">
                    <h3>350€ / Jour</h3>
                    <p>A partir de 10 jours *</p>
                </div>

                <Button>Reserver</Button>
            </div>
        </div>
    </div>
  )
}
