import React, { useState, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
// import Loader from "../Loader.jsx";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Cookies from 'js-cookie';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { PATH_DASHBOARD } from '@/src/routes/path';
import CloseIcon from '@/src/components/icons/border/CloseIcon';
import AddCircleIcon from '@/src/components/icons/border/AddCircleIcon';
import { EditorProps } from 'react-draft-wysiwyg';
import LogoIcon from '@/public/byteBlogger1.png';
import { createPost, getAllCategory, updatePost } from '@/src/services/post';
import Loader from '../../Loader/Loader';
import { toast } from 'react-hot-toast';
import { getPostsByBlogId } from '@/src/services/post';

const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false });
interface IBlogState {
  title: string;
  description: string;
  tags: string[];
  previewImage: File | null;
  font: string;
}

const Create = () => {
  const accessTokenFromCookie: string | undefined = Cookies.get('accessToken');
  const router = useRouter();
  const { blog_id } = router.query;

  const [blogState, setBlogState] = useState<IBlogState>({
    title: '',
    description: '',
    tags: [],
    previewImage: null,
    font: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviewURL, setImagePreviewURL] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [suggestions, setSuggestions] = useState([]);
  const [fontToggle, setFontToggle] = useState(false);
  const [suggestionToggle, setSuggestionToggle] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [selectedFont, setSelectedFont] = useState('');
  const fonts = [''];

  const handleRemoveTag = (target: string) => {
    setBlogState((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== target) }));
  };
  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (!blog_id) {
          return;
        }

        const response = await getPostsByBlogId(accessTokenFromCookie, blog_id);
        console.log(response);
        if (response.message) {
          const contentFromAPI = response?.data[0]?.data[0]?.content;
          const contentState = ContentState.createFromBlockArray(convertFromHTML(contentFromAPI).contentBlocks);
          const newEditorState = EditorState.createWithContent(contentState);
          setBlogState({
            title: response?.data[0]?.data[0]?.title,
            description: response?.data[0]?.data[0]?.description,
            tags: response?.data[0]?.data[0]?.tags,
            previewImage: response?.data[0]?.data[0]?.img,
            font: response?.data[0]?.data[0]?.font,
          });
          setEditorState(newEditorState);
          setSelectedCategory(response?.data[0]?.data[0]?.category);
        } else {
          console.error('Failed to fetch blog post data.');
        }
      } catch (error) {
        console.error('An error occurred while fetching blog post data:', error);
      }
    };

    fetchBlogData();
  }, [blog_id, accessTokenFromCookie]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getAllCategory(accessTokenFromCookie);
        setCategories(categoryData?.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchCategories();
  }, []);

  console.log(categories, 'okokokokokoko');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    if (
      !blogState.title ||
      !editorState.getCurrentContent().hasText() ||
      !blogState.tags.length ||
      !blogState.previewImage ||
      !selectedCategory
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', blogState.previewImage);
      formData.append('title', blogState.title);
      formData.append('description', blogState.description);
      formData.append('content', editorState.getCurrentContent().getPlainText());
      formData.append('tags', JSON.stringify(blogState.tags));
      formData.append('font', blogState.font);
      formData.append('category', selectedCategory);

      if (blog_id) {
        const response = await updatePost(accessTokenFromCookie, blog_id, formData);
        if (response.message) {
          toast.success(response.message);
          router.push(PATH_DASHBOARD.profile);
        } else {
          console.error('Error updating post:', response.error);
        }
      } else {
        const response = await createPost(accessTokenFromCookie, formData);
        console.log('Post created successfully!');

        if (response.message) {
          console.log('Post created successfully!');
          router.push(PATH_DASHBOARD.profile);
        } else {
          console.error('Error creating post:', response.error);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function filterWords(prefix: string) {
    return fonts.filter((font: any) => font.family.toLowerCase().startsWith(prefix));
  }

  const handleFontSelect = (e: any) => {
    const selectedFont = e.family;
    const newfont = selectedFont.replace(/ /g, '+');
    setSelectedFont(selectedFont);
    setFontToggle(false);
    setBlogState((prev) => ({ ...prev, font: selectedFont }));
    setSuggestions([]);
    setSuggestionToggle(false);
  };

  function handleFontChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.toLowerCase();
    if (value === '') {
      setSuggestionToggle(false);
    } else {
      setSuggestionToggle(true);
    }
    handleBlogStateChange(event);
  }
  const handleTagInputKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputTag = event.target.value.trim().toLowerCase();
      if (inputTag.length && !blogState.tags.includes(inputTag)) {
        setBlogState((prev) => ({ ...prev, tags: [...prev.tags, inputTag] }));
      }
      event.target.value = '';
    }
  };

  const handleBlogStateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name !== 'previewImage') {
      return setBlogState((prev) => ({ ...prev, [name]: value }));
    }

    if (files && files.length) {
      const selectedImageFile = files[0];
      const imageURL = URL.createObjectURL(selectedImageFile);
      setImagePreviewURL(imageURL);
      setBlogState((prev) => ({ ...prev, [name]: selectedImageFile }));
    }
  };

  return (
    <>
      {isLoading && Loader}
      <div className="grid grid-cols-12 sm:ml-16 ml-2">
        <div className="sm:col-span-9 col-span-12 sm:order-1 order-2 sm:mr-9 mr-2 h-fit">
          <form className="flex flex-col">
            <div className="titles flex items-center gap-2 sm:mt-12 mt-4">
              <div className="icon relative cursor-pointer" id="demoicon">
                {!fontToggle ? (
                  <AddCircleIcon
                    color="#fff"
                    className="sm:w-10 w-4 h-4 sm:h-10"
                    onClick={() => {
                      setFontToggle(!fontToggle);
                    }}
                  />
                ) : (
                  <CloseIcon
                    color="#fff"
                    className="sm:w-10 w-4 h-4 sm:h-10"
                    onClick={() => {
                      setFontToggle(!fontToggle);
                    }}
                  />
                )}
                <AnimatePresence>
                  {fontToggle && (
                    <motion.div
                      initial={{ opacity: 0, y: '-100vh' }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: '-100vh' }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                        duration: 0.75,
                      }}
                      className="iconmodal absolute top-10 left-8 h-[250px] w-[300px] rounded-lg p-1 flex flex-col justify-between"
                      id="fonttoggle"
                    >
                      <input
                        type="text"
                        value={blogState.font}
                        name="font"
                        onChange={handleFontChange}
                        placeholder="Enter the font"
                        className="text-white w-full p-2 bg-[#393939] border border-slate-300 outline-none rounded-lg"
                      />
                      {suggestionToggle && (
                        <div className="suggestions h-[30vh] overflow-y-scroll scrollbar-hide rounded-lg p-2">
                          <div className="wrapper h-auto bg-[#252525] p-1 rounded-lg flex flex-col gap-2">
                            {suggestions.map((s: any, index) => (
                              <div
                                className="suggestion text-white hover:bg-[#b203c9] transition cursor-pointer duration-75 ease-in rounded-lg p-1"
                                key={s.family}
                                onClick={() => handleFontSelect(s)}
                              >
                                <p>{s.family}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="titlebar flex bg-[#252525] bg-opacity-30 py-3 px-2 rounded-3xl w-full gap-1 items-center">
                <label htmlFor="title" className="font-semibold text-[#cbcbcb] sm:text-base text-[8.5px] font-inter">
                  Title:
                </label>
                <input
                  id="title"
                  className="w-full placeholder:text-[#626262] sm:placeholder:text-base sm:text-base text-[8.5px] outline-none font-medium bg-transparent text-[#bcbcbc]"
                  placeholder="Give a title to your Blog"
                  type="text"
                  name="title"
                  value={blogState.title}
                  onChange={handleBlogStateChange}
                  required
                />
              </div>
            </div>
            <div className="mt-3">
              <textarea
                placeholder="Short description"
                className="rounded-3xl border-[1px] border-[#747474] bg-transparent w-full resize-none outline-none px-7 py-2 sm:py-3 placeholder:text-[#626262] sm:placeholder:text-base text-xs font-medium text-[#bcbcbc]"
                rows={4}
              />
            </div>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class !mt-4 sm:!mt-7"
              editorClassName="editor-class sm:!h-[60vh] !h-[28vh]"
              toolbarClassName="toolbar-class"
              placeholder="Write yor blog here"
            />
          </form>
        </div>
        <div className="flex sm:flex-col flex-col-reverse sm:mt-12 sm:col-span-3 col-span-12 sm:order-2 order-1 sm:mr-9">
          <div className="flex sm:flex-col flex-row justify-between sm:justify-normal px-2 mt-[14px] sm:mt-0">
            <div className="flex sm:flex-col flex-col-reverse items-center gap-4 sm:mb-12 mt-3 sm:mt-0">
              {blogState.previewImage ? (
                <div className="flex sm:flex-col flex-col-reverse gap-5 ">
                  <div className="sm:w-60 sm:h-[188px] w-28 h-[91px]">
                    <Image
                      width={25}
                      height={25}
                      src={imagePreviewURL}
                      alt="preview image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    className="lg:p-2 p-1 text-white bg-black lg:text-sm sm:text-[10px] text-[10px] rounded-2xl border border-purple-500"
                    onClick={() => {
                      setBlogState((prev) => ({ ...prev, previewImage: null }));
                    }}
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <motion.div className="text-white text-[6px] sm:text-xs whitespace-nowrap border-[1px] border-[#929292] rounded-lg flex justify-center items-center sm:px-[70px] sm:py-20 px-6 py-10">
                  Preview Image
                </motion.div>
              )}

              <input
                type="file"
                id="img"
                className="hidden"
                name="previewImage"
                accept="image/*"
                onChange={handleBlogStateChange}
              />
              <label
                htmlFor="img"
                className="text-white text-center font-inter sm:text-xs text-[6px] font-semibold  cursor-pointer rounded-md bg-[#A801DF] w-fit  py-1 px-1"
              >
                Add Image <br /> (JPG, JPEG AND PNG)
              </label>
            </div>
            <div className=" flex flex-col gap-1 mb-4 cursor-pointer">
              <label htmlFor="tags" className="text-white font-inter text-[6px] text-sm font-semibold ">
                Select Your Category
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="cursor-pointer rounded-md outline-none sm:py-3 text-[7px] text-base py-[6px] px-1 bg-[#252525] text-white w-full"
              >
                <option className="cursor-pointer" value="">
                  Select a category
                </option>
                {categories?.map((category: any) => (
                  <option key={category?._id} value={category?.name} className="cursor-pointer">
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-fit mt-2">
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="tags" className="text-white font-inter text-[6px] sm:text-xs font-semibold ">
                  Add Tags
                </label>
                <input
                  id="tags"
                  type="text"
                  className="rounded-md outline-none sm:py-3 text-[7px] sm:text-xs py-[6px] px-1 bg-[#252525] text-white w-full"
                  placeholder="Enter Tags and press Enter"
                  onKeyDown={(event) => handleTagInputKeyDown(event)}
                />
              </div>
              <div
                className={`flex flex-wrap gap-3 items-start rounded-lg border-[1px] border-[#666]  sm:h-40 h-24 sm:w-full w-[152px]`}
              >
                {blogState?.tags?.length == 0 ? (
                  <p className="text-[#818181] font-inter text-[7px] sm:text-xs font-semibold m-auto">
                    Enter A Tag Above And Press Enter
                  </p>
                ) : (
                  blogState?.tags?.map((c, index) => (
                    <button
                      key={c + index}
                      className="button-34 flex items-center gap-1 whitespace-nowrap !text-xs sm:!text-sm !p-1 sm:!p-2"
                    >
                      {c}
                      <CloseIcon onClick={() => handleRemoveTag(c)} className="w-5 h-5" />
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex sm:justify-center justify-between sm:mt-28">
            <Image src={LogoIcon} fill={true} alt="logo icon" className="sm:hidden block" />
            <button
              className="rounded-md bg-[#bf02b5] sm:py-2 sm:px-5 py-1 px-[10px] sm:mr-0 mr-2 text-white font-inter font-semibold text-xs sm:text-xl mt-4"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : blog_id ? 'Update Blog' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
