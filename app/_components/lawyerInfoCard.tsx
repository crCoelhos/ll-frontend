import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import React from 'react';
import { map } from 'zod';

interface LawyerInfoCardProps {
    name: string;
    title: string;
    specialization: string[];
    contactNumber: string[] | string;
    description: string;
    UF: string;
    subsection: string;
    image: {
        fallback: string;
        src?: string;
    };
}


export function LawyerInfoCard(props: LawyerInfoCardProps) {

    return (
        <div className='lawyerInfoCard flex flex-row m-2'>
            <Card className='flex flex-row w-full justify-between px-12 mx-2'>
                <div className="info flex flex-row items-center justify-center">


                    <CardHeader className='text-center'>
                        <CardTitle>{props.name}</CardTitle> {props.title}
                    </CardHeader>

                    <div className='flex flex-col justify-center'>
                        {props.specialization.length > 0 ? (
                            props.specialization.map((specialization: string) => (
                                <CardContent key={specialization}>
                                    <Badge>{specialization}</Badge>
                                </CardContent>
                            ))
                        ) : (
                            <CardContent>
                                <Badge>Nenhuma</Badge>
                            </CardContent>
                        )}
                    </div>

                    <CardDescription className='text-center'>
                        {props.description}
                    </CardDescription>

                    <CardFooter className='flex flex-row'>
                        <span>
                            {props.contactNumber}
                        </span>
                        <span>
                            - {props.subsection}
                        </span>
                        <span>
                            - {props.UF}.
                        </span>
                    </CardFooter>
                </div>


                <div className="basicData flex items-center justify-center my-2">
                    <Avatar className='w-[128px] h-[128px] '>
                        <AvatarImage src={props.image.src} />
                        <AvatarFallback>{props.image.fallback}</AvatarFallback>
                    </Avatar>
                </div>
            </Card>
        </div>
    );
};

export default LawyerInfoCard;
