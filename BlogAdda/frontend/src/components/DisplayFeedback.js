export const DisplayFeedback = ({ feedback, feedbackusername, feedbackprofilepic }) => {
  
    return (
        <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      src={feedbackprofilepic}
                      alt="Michael Gough"
                    />
                    {feedbackusername}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time
                      pubdate
                      datetime="2022-02-08"
                      title="February 8th, 2022"
                    >
                      {feedback.createdAt}
                    </time>
                  </p>
                </div>
              </footer>
              <p>
                {feedback.content}
              </p>
            </article>
    );
    
  };
  