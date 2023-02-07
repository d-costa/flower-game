import Header from "./Header";

function Page({ children }) {
  return (
    <div className={"content"}>
      <Header />
      {children}
      {/*<Footer/>*/}
    </div>
  );
}

export default Page;
