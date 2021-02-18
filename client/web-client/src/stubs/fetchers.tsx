/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from "restful-react";
export const SPEC_VERSION = "1.0"; 

export type AppControllerGetHelloProps = Omit<GetProps<void, unknown, void, void>, "path">;

export const AppControllerGetHello = (props: AppControllerGetHelloProps) => (
  <Get<void, unknown, void, void>
    path={`/`}
    
    {...props}
  />
);

export type UseAppControllerGetHelloProps = Omit<UseGetProps<void, unknown, void, void>, "path">;

export const useAppControllerGetHello = (props: UseAppControllerGetHelloProps) => useGet<void, unknown, void, void>(`/`, props);


export type IncidencesControllerGetIncidencesProps = Omit<GetProps<void, unknown, void, void>, "path">;

export const IncidencesControllerGetIncidences = (props: IncidencesControllerGetIncidencesProps) => (
  <Get<void, unknown, void, void>
    path={`/incidences`}
    
    {...props}
  />
);

export type UseIncidencesControllerGetIncidencesProps = Omit<UseGetProps<void, unknown, void, void>, "path">;

export const useIncidencesControllerGetIncidences = (props: UseIncidencesControllerGetIncidencesProps) => useGet<void, unknown, void, void>(`/incidences`, props);


export type IncidencesControllerUploadFileProps = Omit<MutateProps<void, unknown, void, void, void>, "path" | "verb">;

export const IncidencesControllerUploadFile = (props: IncidencesControllerUploadFileProps) => (
  <Mutate<void, unknown, void, void, void>
    verb="POST"
    path={`/incidences`}
    
    {...props}
  />
);

export type UseIncidencesControllerUploadFileProps = Omit<UseMutateProps<void, unknown, void, void, void>, "path" | "verb">;

export const useIncidencesControllerUploadFile = (props: UseIncidencesControllerUploadFileProps) => useMutate<void, unknown, void, void, void>("POST", `/incidences`, props);


export type IncidencesControllerGetIncidencesByRegionProps = Omit<GetProps<void, unknown, void, void>, "path">;

export const IncidencesControllerGetIncidencesByRegion = (props: IncidencesControllerGetIncidencesByRegionProps) => (
  <Get<void, unknown, void, void>
    path={`/incidences/regions`}
    
    {...props}
  />
);

export type UseIncidencesControllerGetIncidencesByRegionProps = Omit<UseGetProps<void, unknown, void, void>, "path">;

export const useIncidencesControllerGetIncidencesByRegion = (props: UseIncidencesControllerGetIncidencesByRegionProps) => useGet<void, unknown, void, void>(`/incidences/regions`, props);

