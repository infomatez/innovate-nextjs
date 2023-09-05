import UserPanelLayout from "@/src/layouts/admin/nav";
import { GetServerSideProps } from "next";
import { withAuthServerSideProps } from "@/src/components/PrivateRoutes/withAuthServerSideProps";

SavedBlogPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function SavedBlogPage() {
    const styles = {
        paddingX: "sm:px-16 px-6",
        paddingY: "sm:py-16 py-6",
        padding: "sm:px-16 px-6 sm:py-16 py-10",

        heroHeadText:
            "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
        heroSubText:
            "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
        heroSubText2:
            "text-[#dfd9ff] font-medium lg:text-[20px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",

        sectionHeadText:
            "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] font-family: 'Fjalla One'",
        sectionSubText:
            "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
    };


    return (
        <section className="wrapper w-full px-2 py-10">
            <div className="bg-black-100 rounded-[20px] h-full overflow-y-scroll scrollbar-hide">
                <div className={`${styles.padding} sidebar-bg-ct rounded-2xl`}>
                    <p className={`${styles.sectionSubText} text-slate-400`}>Read at your own leisure!</p>
                    <h2 className={styles.sectionHeadText} id="aboutush2">Saved Blogs</h2>
                </div>
                <div
                    className={`${styles.padding} -mt-14 md:-mt-20 pb-14 flex flex-wrap justify-around gap-7`}
                >
                    <div className="grid grid-cols-12 gap-4 w-full gap-7 h-full overflow-y-scroll scrollbar-hide">
                        <h1 className="title text-3xl text-white font-bold mt-16 col-span-12 text-center">
                            No blogs saved till now!
                        </h1>

                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div><div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>   
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>
                        <div className="blog-bg-ct p-5 rounded-2xl w-full col-span-12 md:col-span-6 xl:col-span-4 h-auto">
                            <div className="relative w-full sm:h-[230px] h-fit">
                                <img
                                    src={'https://lh3.googleusercontent.com/a/AAcHTtedue8CiQ9YWFdVWobpgmzoRYuw1W0ollyGhMPJCBs=s96-c'}
                                    alt="name"
                                    className="sm:w-full sm:h-full w-fit object-cover rounded-2xl"
                                />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-white font-bold sm:text-[24px] text-[14px]">
                                    This is temparary Titiel
                                </h3>
                                <p className="mt-2 text-secondary sm:text-[18px] text-[11px]">
                                    This is the content part with the html parse data
                                </p>
                            </div>
                            <div className="mt-4 flex-wrap gap-2 sm:flex hidden text-white">
                                <p className={`text-[14px]`}>#this</p>
                                <p className={`text-[14px]`}>#new</p>
                                <p className={`text-[14px]`}>#Blog</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}


export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
