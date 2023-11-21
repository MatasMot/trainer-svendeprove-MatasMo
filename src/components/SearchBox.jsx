

const SearchBox = () => {
    return ( 
        <form action="/search">
            <input className="border-2 border-[#D4D4D4] rounded-full bg-[#FCFBFB] mx-4 px-4 py-2 w-[91vw]" type="search" name="q" placeholder="&#128269; Search classes"/>
        </form>
     );
}
 
export default SearchBox;