

const latestPostContainer = document.getElementById('latest_post_container');
// const onlineElement = document.getElementById('online');


const loadAllPosts = async (searchId='') => {
    // const url = `https://openapi.programming-hero.com/api/retro-forum/posts`;
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllPosts(data.posts);
}

const displayAllPosts = (posts) => {
    const leftSideDynamicContainer = document.getElementById('dynamic-container');
    leftSideDynamicContainer.innerHTML = ``;
    
    posts.forEach(post => {

        let bgColor;
        if (post.isActive) {
            bgColor = `
            <img class="w-20 md:w-14 rounded-full" src=${post.image}>
                <div id="online" class="w-3 h-3 rounded-full bg-green-600 absolute top-0 ">
            </div>
            `;
        }
        else {
            bgColor = `
            <img class="w-20 md:w-14 rounded-full" src=${post.image}>
                <div id="online" class="w-3 h-3 rounded-full bg-red-600 absolute top-0 ">
            </div>
            `;
        }
        
        const mainDiv = document.createElement('div');
        mainDiv.classList = `flex gap-6 bg-[#797DFC] bg-opacity-20 p-10 rounded-2xl mb-5`
        mainDiv.innerHTML = `
        <div class="relative">
                            ${bgColor}
                        </div>
        <div class="space-y-2">

                            <div class="flex gap-5 font-medium text-sm inter">
                                <p># <span>${post.category}</span></p>
                                <p>Author: <span>${post.author.name}</span></p>
                            </div>

                            <h3 class="mulish md:text-xl text-[#12132D] font-bold">${post.title}</h3>
                            <p class="text-[#12132d99] inter ">${post.description}</p>
                            <hr class="border-dashed border-[#12132d99]">
                            <div class="flex justify-between text-[#12132d99] inter">
                                <div class="flex gap-4">
                                    <p><i class="fa-regular fa-message"></i> <span>${post.comment_count}</span></p>
                                    <p><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                                    <p></p>
                                    <p><i class="fa-regular fa-clock"></i> <span>${post.posted_time}</span> min</p>
                                </div>
                                <div>
                                    <button class="btn bg-[#10B981] btn-circle">
                                        <i class="fa-regular fa-envelope-open text-white font-bold text-lg"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
        
        `;
        leftSideDynamicContainer.appendChild(mainDiv)

    });
}



const loadLatestPosts = async () => {
    const url = `https://openapi.programming-hero.com/api/retro-forum/latest-posts`;
    const res = await fetch(url);
    const data = await res.json();
    displayLatestPosts(data);
}


const displayLatestPosts = (data) => {
    // console.log(data);
    data.forEach(post => {
        // console.log(post);
        const newDiv = document.createElement('div');
        newDiv.classList = `mulish space-y-4 border border-[#12132d26] p-8 rounded-3xl`;
        newDiv.innerHTML = `
                    <img class="mx-auto w-full rounded-2xl" src=${post.cover_image}>
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-calendar"></i>
                        <p class="text-[#12132d99] ">${post.author.posted_date ? post.author.posted_date : 'No publish date'}</p>
                    </div>
                    <h3 class="font-bold text-lg ">${post.title}</h3>
                    <p class="text-[#12132d99]">${post.description}</p>
                    <div class="flex gap-2 items-center">
                        <img class ="w-14 h-14 rounded-full" src=${post.profile_image}>
                        <div>
                            <p class="font-semibold">${post.author.name}</p>
                            <p class="text-sm text-[#12132d99]">${post.author.designation ? post.author.designation : "Unknown"}</p>
                        </div>
                    </div>
    
    `;
        latestPostContainer.appendChild(newDiv);
    })

}


const searchBtnHandler = () => {
    const inputField = document.getElementById('input_Field');
    const inputText = inputField.value;
    loadAllPosts(inputText);
    console.log(inputText);
}





loadAllPosts();

loadLatestPosts()