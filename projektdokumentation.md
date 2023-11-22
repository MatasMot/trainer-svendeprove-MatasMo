# Trainer - Svendeprøve Projektdokumentation

#### Navn: Matas Motuzas

##### Hold: WU08

##### Uddannelse: Webudvikler

##### Uddannelsessted: Roskilde Tekniske Skole


## Indholdsfortegnelse

- [Tech Stack](#tech-stack)
- [Overvejelser og Valg](#overvejelser-og-valg)
- [Arbejdsgang](#arbejdsgang)
- [Kodeeksempler](#kodeeksempler)

# Tech Stack

Til min svendeprøve har jeg valgt følgende stack:

- [React](#react)
- [TailwindCSS](#tailwindcss)
- [React Router Dom](#react-router-dom)
- [Formik](#formik)
- [Yup](#yup)
- [js-cookie](#js-cookie)

## React

React er et bibliotek, skabt til at lave SPA's. React giver en redskaber som hooks (`useState`, `useEffect` mm.) og komponenter. React giver en masse fleksibilitet, da det er unopininated.  
React har et stort community og gode docs, som gør det nemt at finde hjælp, når der opstår problemer.


## TailwindCSS

TailwindCSS er et utility-first CSS framework, der gør det hurtigt og nemt at style ens komponenter.
I stedet for at skrive normal CSS kan man give ens elementer klasser som: `flex` for at give den `display: flex`.  
Jeg valgte TailwindCSS over andre CSS frameworks, som **Bootstrap**, fordi det er meget mere customizable. Du føler du skriver CSS, bare hurtigere, hvor Bootstrap og andre CSS frameworks typisk har en bestemt måde de gerne selv vil have det skal se ud. Derudover har TailwindCSS rigtig gode docs og et voksende community.

## React Router Dom

React Router Dom er et bibliotek til at navigere i din SPA. Pakken giver dig mange hooks , der hjælper dig til at navigere rundt i appen, fx med `<Link>`-komponentet eller `useNavigate`-hooket.  
Jeg har valgt at bruge React Router Dom fordi det er pakke med meget "erfaring" og den bliver stadig vedligeholdt og får regelmæssige opdateringer, samtidigt med den gør det nemt at opsætte ens navigation og kommer med alle de ting man har brug for mht. navigation i din SPA.

## Formik

Formik er et bibliotek der gør det nemmere at lave forme i React, den tager hånd om alle værdier og fejl for en. Formik er meget fleksibelt og man kan nemt lave sin form som man gerne selv vil have den og få den til at se ud som man ønsker.  
Den har godt integration med [Yup](#yup) som gør det meget nemt at validere ens form. Derudover er Formik nemt at komme i gang med samtidigt med den giver dig alt det du har behov for. Formik har også rigtig gode docs.

## Yup

Yup er et validerings schema-bibliotek, der gør det nemt at validere din form ved at opsætte schemas for dine inputs.  
Jeg har valgt Yup fordi den har integration med Formik, der gør det meget nemt at komme i gang med. Yup har også gode docs.

## Js-cookie

Js-cookie er et bibliotek der gør det nemt at arbejde med Cookies. Jeg valgte at bruge Js-cookie fordi den er et populert bibliotek og den gører cookies simpelt.





# Overvejelser og Valg

Jeg har for eksempel ikke brugt noget bibliotek for icons og brugt "integreret" icons som &times; fordi det ville have været svært at finde præcis de icons som i XD layoutet. 


# Arbejdsgang

Jeg syntes jeg har arbejdet hårdt hele ugen og har været fuldt fokuseret på opgaven. Jeg prioriterede mæst javascript delen, da jeg ved at CSS kan blive skrevet på kort tid, men det tå længere tid end jeg har regnet med.. 
Javascript delen var ikke så scrammende som sidste gang jeg havde svendeprøve, fordi jeg var meget bedre forberedt. 
Noget som jeg ikke har gjordt godt nok var at jeg ikke har læst opgave beskrivelse grundit nok og ikke har taget noter så jeg kunne planlægge tiden bedre. 





# Kodeeksempler


## Search page

```js
export const loader = async ( { request } ) => {
    let url = new URL(request.url)
    let params = url.searchParams.get("q")

    try {
        let response = await fetch(`http://localhost:4000/api/v1/classes`, {
            // standard method is GET for fetch
        })

        let result =  await response.json()
        //console.log(result);

        if (!params) {
            return result;
        }

        let filtered = result.filter(singleClass => 
            singleClass.className.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classDay.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.trainer.trainerName.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classDescription.toLowerCase().includes(params.toLowerCase()) || 
            singleClass.classTime.toLowerCase().includes(params.toLowerCase())
        );

        return filtered;

    } catch (error) {
        return error;
    }

};

```

## Classes page

```js
const Classes = () => {


    let classes = useLoaderData();
    
    /*React uses key prop to identify different elements*/

    const noOfClasses = classes.length;

    const randomClass = Math.floor(Math.random() * noOfClasses);

    
    return (
        <>
            <div className="fixed left-0 top-[6rem]">

                <section className="h-[404px] w-[335px] mx-auto rounded-xl overflow-hidden relative">
                    <Link to={`/class/${classes[randomClass].id}`}>
                        <img className="w-full h-full object-cover" src={classes[randomClass].asset.url} alt="" />
                        <h2 className="absolute bottom-0 left-0 bg-[#F1C40E] p-4 pr-8 rounded-tr-[3rem] font-semibold">
                            {classes[randomClass].className}
                            <Ratings singleClassId={classes[randomClass].id}/>
                        </h2>
                    </Link>
                </section>
            </div>
        </>
    );
}
```