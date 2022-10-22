import React from 'react';
import {
  HeaderStyled,
  SearchFormStyled,
  SearchBtnStyled,
  SearchInputStyled,
  ErrorMessageStyled,
} from './Searchbar.styled';
import * as Yup from 'yup';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object({
  input: Yup.string().min(2, 'Min 2 symbols required!').required(),
}).required();

export default function Searchbar({ onSearch }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      input: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    onSearch(data.input);
  };

  return (
    <HeaderStyled>
      <SearchFormStyled onSubmit={handleSubmit(onSubmit)}>
        <SearchBtnStyled type="submit">
          <FaSearch size="25px" />
        </SearchBtnStyled>

        <Controller
          name="input"
          control={control}
          render={({ field }) => (
            <SearchInputStyled
              {...field}
              type="text"
              name="input"
              autoComplete="off"
              placeholder="Search images and photos"
            />
          )}
        />
      </SearchFormStyled>
      <ErrorMessageStyled>{errors.input?.message}</ErrorMessageStyled>
    </HeaderStyled>
  );
}

Searchbar.propTypes = {
  onSearch: PropTypes.func,
};
