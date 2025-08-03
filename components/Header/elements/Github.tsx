"use client";
import React, { useState, useEffect } from "react";
import TooltipElement from "@/components/common/TooltipElement";
import { Button } from "@/components/ui/button";
import { ChevronRight, Github, Star } from "lucide-react";
import Link from "next/link";
import { frontend, backend } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const GitHubLink = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  const [frontImg, setFrontImg] = useState(null);
  const [frontStars, setFrontStars] = useState(0);
  const [backImg, setBackImg] = useState(null);
  const [backStars, setBackStars] = useState(0);
  const showDrawer = useMediaQuery({ query: "(max-width: 425px)" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/${frontend.userName}/${frontend.repoName}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setFrontImg(data.owner.avatar_url);
        setFrontStars(data.stargazers_count);
      });
    fetch(
      `https://api.github.com/repos/${backend.userName}/${backend.repoName}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setBackImg(data.owner.avatar_url);
        setBackStars(data.stargazers_count);
      });
    setIsDomLoaded(true);
  }, []);

  if (!isDomLoaded) {
    return (
      <Button size="icon" variant={"ghost"} asChild>
        <Github className={"p-2"} />
      </Button>
    );
  }

  if (showDrawer) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="icon" variant={"ghost"}>
            <Github className={"p-0.5"} />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-2 pb-4">
          <div className="mx-auto mt-4 flex w-full max-w-xs flex-col gap-2 text-sm">
            <RepoCard
              repoName={backend.repoName}
              stars={backStars}
              url={backend.url}
              img={backImg ?? backend.fallbackImage}
              owner={backend.userName}
            />
            <RepoCard
              repoName={frontend.repoName}
              stars={frontStars}
              url={frontend.url}
              img={frontImg ?? frontend.fallbackImage}
              owner={frontend.userName}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <TooltipElement
          element={
            <Button size="icon" variant={"ghost"} asChild>
              <Github className={"p-2"} />
            </Button>
          }
          tooltip={"GitHub"}
        ></TooltipElement>
      </PopoverTrigger>
      <PopoverContent align="end" alignOffset={-45} className="w-[300px] p-2">
        <div className="flex flex-col gap-2 text-sm">
          <RepoCard
            repoName={backend.repoName}
            stars={backStars}
            url={backend.url}
            img={backImg ?? backend.fallbackImage}
            owner={backend.userName}
          />
          <RepoCard
            repoName={frontend.repoName}
            stars={frontStars}
            url={frontend.url}
            img={frontImg ?? frontend.fallbackImage}
            owner={frontend.userName}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default GitHubLink;

const RepoCard = (props: any) => {
  const { repoName, stars, url, img, owner } = props;
  const size = 40;
  const showStars = false;
  return (
    <Link
      href={url}
      target="_blank"
      className="group flex items-center justify-between rounded-md border bg-zinc-100  px-2 py-2 transition-all hover:bg-zinc-200 dark:border-zinc-800/80 dark:bg-zinc-900 dark:hover:bg-zinc-800/90"
    >
      <div className="flex items-center gap-3">
        <Image
          src={img}
          alt="Avatar"
          width={size}
          height={size}
          className="rounded-full border-2 border-zinc-300 dark:border-zinc-950/40"
        />
        <div className="flex flex-col">
          <span className="text-[0.65rem] font-medium leading-none opacity-80 dark:font-normal">
            {owner}
          </span>
          <span className="font-medium leading-tight tracking-wide">
            {repoName}
          </span>

          {showStars && (
            <div className="mt-1.5 flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span className="ml-0.5 text-xs font-medium leading-none">
                {stars}
              </span>
            </div>
          )}
        </div>
      </div>
      <ChevronRight className="h-4 w-4 -translate-x-3 opacity-40 transition-all group-hover:-translate-x-1 group-hover:opacity-90" />
    </Link>
  );
};
