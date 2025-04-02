from django.core.cache import cache
from functools import wraps
from django.conf import settings

def cache_view(timeout=60 * 15):  # 15 минут по умолчанию
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(self, request, *args, **kwargs):
            cache_key = f"{view_func.__name__}:{request.get_full_path()}"
            response = cache.get(cache_key)
            
            if response is None:
                response = view_func(self, request, *args, **kwargs)
                cache.set(cache_key, response, timeout)
            
            return response
        return _wrapped_view
    return decorator

def invalidate_cache(pattern):
    """Инвалидирует кэш по заданному паттерну"""
    keys = cache.keys(pattern)
    if keys:
        cache.delete_many(keys) 