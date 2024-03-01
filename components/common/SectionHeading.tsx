import React from "react";

const SectionHeading = (props: any) => {
  const Icon = props.Icon;
  const title = props.title;
  return (
    <div className="flex items-center">
      <Icon className="ml-1 mr-3" />
      <h2 className="text-xl font-semibold dark:font-medium md:text-2xl">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
