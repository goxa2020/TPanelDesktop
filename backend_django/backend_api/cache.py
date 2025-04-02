from django.core.cache import cache
from functools import wraps
from django.conf import settings
from rest_framework.response import Response

def cache_view(timeout=60 * 15):  # 15 минут по умолчанию
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self, request, *args, **kwargs):
            cache_key = f"{view_func.__name__}:{request.get_full_path()}"
            cached_data = cache.get(cache_key)
            
            if cached_data is None:
                response = view_func(self, request, *args, **kwargs)
                if isinstance(response, Response):
                    # Кэшируем только данные, а не весь объект Response
                    cache.set(cache_key, response.data, timeout)
                    return response
                return response
            
            # Возвращаем новый Response с кэшированными данными
            return Response(cached_data)
        return _wrapped_view
    return decorator

def invalidate_cache(pattern):
    """Инвалидирует кэш по заданному паттерну"""
    keys = cache.keys(pattern)
    if keys:
        cache.delete_many(keys) 