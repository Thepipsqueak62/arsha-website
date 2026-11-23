"use client";

import { Calendar, Film, Radio, Clock, PlayCircle } from "lucide-react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card, CardAction,
    CardContent,
    CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function StreamsPage() {
    return (
        <div className="min-h-screen w-full bg-background">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
                <span className={"text-8xl justify-center flex"}>⚠️</span>
                <div className={"py-9 pt-9 flex justify-center text-3xl font-bold"}>PAGE IN DEVELOPMENT</div>


                {/* Header */}
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                        Arsha Streams
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Find Upcoming Live and past Arsha Live Streams
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="live" className="flex flex-col w-full space-y-4">

                    <TabsList className="
            inline-flex h-10 items-center
            w-full sm:w-fit
            bg-muted/40
            rounded-lg
            p-1
            gap-1
          ">
                        <TabsTrigger
                            value="live"
                            className="flex items-center gap-2 text-xs sm:text-sm rounded-md px-3 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500"
                        >
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            Live
                        </TabsTrigger>

                        <TabsTrigger
                            value="upcoming"
                            className="flex items-center gap-2 text-xs sm:text-sm rounded-md px-3"
                        >
                            <Calendar size={14} />
                            Upcoming
                        </TabsTrigger>

                        <TabsTrigger
                            value="vods"
                            className="flex items-center gap-2 text-xs sm:text-sm rounded-md px-3"
                        >
                            <Film size={14} />
                            VODs
                        </TabsTrigger>
                    </TabsList>

                    {/* LIVE */}
                    <TabsContent value="live" className="mt-0">
                        <Card className="w-full border-red-500/20 bg-gradient-to-br from-red-500/[0.04] to-transparent">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Radio size={16} className="text-red-500" />
                                    Live Now
                                </CardTitle>
                                <CardDescription>
                                    Active streams and real-time status.
                                </CardDescription>
                            </CardHeader>

                            <CardContent >
                                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                                    Streams
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* UPCOMING */}
                    <TabsContent value="upcoming" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Upcoming Streams</CardTitle>
                                <CardDescription>
                                    Scheduled broadcasts and future events.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-4">
                                    <div className="rounded-full bg-primary/10 p-2 shrink-0">
                                        <Clock size={16} className="text-primary" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">2 streams</span>
                                        <span className="text-muted-foreground"> scheduled this week.</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* VODS */}
                    <TabsContent value="vods" className="mt-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Past Streams</CardTitle>
                                <CardDescription>
                                    Watch and manage recorded streams.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 rounded-lg border bg-muted/20 p-4">
                                    <div className="rounded-full bg-primary/10 p-2 shrink-0">
                                        <PlayCircle size={16} className="text-primary" />
                                    </div>
                                    <div className="text-sm">
                                        <span className="font-medium">12 VODs</span>
                                        <span className="text-muted-foreground"> available.</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
                <div>
                    <Card className="w-full max-w-sm border-primary border-2">
                        <CardHeader>
                            <CardTitle >NHG VS KRL Valorant</CardTitle>
                            <CardDescription>
                                NHG vs KRL Valorant Tournament come watch 2 of the best teams in North America face off
                                at Arsha Finals
                            </CardDescription>

                        </CardHeader>
                        <CardContent>
                            Something
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                WATCH NOW
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}