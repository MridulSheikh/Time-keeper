import { BlogTopBanner } from "@/components";
import React from "react";

const page = () => {
  return (
    <div>
      <BlogTopBanner img={"/images/blog_cover.png"} />
      <div className=" max-w-screen-md mx-auto px-4 my-14">
        <h1 className=" text-6xl leading-normal font-oswoald text-cs-black">
          Never Follow These Fake Tips to Care for a Watch.
        </h1>
        <h2 className="mt-4 text-md font-roboto text-cs-gray">
          26 January 2019
        </h2>
        <div className="mt-7">
          Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem
          vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
          accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
          delenit augue duis dolore te feugait nulla facilisi. Sed ut
          perspiciatis, unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt,
          explicabo. nemo enim ipsam voluptatem, quia voluptas sit, aspernatur
          aut odit aut fugit, sed quia consequuntur magni dolores eos, qui
          ratione voluptatem sequi nesciunt, neque porro quisquam est, qui
          dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt, ut labore et dolore
          magnam aliquam quaerat voluptatem.
        </div>
      </div>
    </div>
  );
};

export default page;
